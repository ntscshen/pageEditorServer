const { getSmsCodeFromCache } = require('../../cache/smsCode');
const { ErrorModel, SuccessModel } = require('../../resModel');
const { SMS_CODE_ERROR, USER_IS_DISABLED, CREATE_USER_FAIL } = require('../../resModel/failInfo/users');
const { getUserInfoByPhoneNumber, updateUserInfo, createUserByPhoneNumber } = require('../../service/users');
const randomName = require('random-name');
const { jwtSign } = require('../../utils/jwt');
const { doCrypto } = require('../../utils/crypto');

const loginByPhoneNumber = async (phoneNumber, smsCode) => {
  // 1. 验证验证码是否正确( 从缓存中读取验证码，和前端传递的验证码进行比较 )
  // 60s内缓存中的验证码是不会变的，所以可以直接从缓存中读取验证码
  const cacheSmsCodeFromCache = await getSmsCodeFromCache(phoneNumber);
  if (cacheSmsCodeFromCache !== smsCode) {
    // 验证码不正确
    return new ErrorModel(SMS_CODE_ERROR);
  }

  // 如果用户的验证码 === 缓存中的验证码
  // 我们查找当前用户是否存在 ( 通过手机号查找用户 )，如果用户存在，直接返回用户信息，如果用户不存在，创建用户，然后返回用户信息

  // 2. 查找用户是否存在 ( 通过手机号查找用户 )
  const user = await getUserInfoByPhoneNumber(phoneNumber);
  if (user) {
    // 用户是否被禁用
    if (user.isDisabled) return new ErrorModel(USER_IS_DISABLED);
    // 更新用户的最后登录时间
    try {
      updateUserInfo(user.id, { lastLoginTime: Date.now() });
    } catch (error) {
      console.error('更新用户的最后登录时间失败', error); // 只记录日志，不做处理
    }
    // 返回加密后的 token 信息
    return new SuccessModel({
      token: jwtSign(user),
    });
  }

  // 3. 查找不到用户，创建用户
  const password = doCrypto(phoneNumber.slice(-6)); // 手机号注册用户，默认用户名为手机号，密码为手机号后6位 ( 12345678901 => 123456 ) , 再次进行加密处理( 为什么要进行加密？ 如果数据库被攻破，用户的密码也会被泄露，所以要进行加密处理 )

  // 创建用户
  try {
    console.log('1111111 :>> ', 1111111);
    const newUser = await createUserByPhoneNumber({
      userName: phoneNumber,
      password,
      phoneNumber,
      nickName: randomName(),
      latestLoginTime: Date.now(),
      gender: 0,
      city: 'hangzhou',
      isFrozen: false,
      picture: '',
    });
    console.log('newUser :>> ', newUser);
    // 创建成功 - 返回加密后的 token 信息
    return new SuccessModel({
      token: jwtSign(newUser),
    });
  } catch (error) {
    console.error('创建用户失败', error);
    return new ErrorModel(CREATE_USER_FAIL);
  }
};

module.exports = loginByPhoneNumber;
