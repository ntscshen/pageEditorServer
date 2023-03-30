const { setSmsCodeToCache } = require('../../cache/smsCode');
const { ErrorModel, SuccessModel } = require('../../resModel');
const { SEND_SMS_CODE_FREQUENCY } = require('../../resModel/failInfo/users');
const { isDev, isProd, isTest } = require('../../utils/env');
const { createSmsCode } = require('../../utils/utils');
const { sendSmsCodeMsg } = require('../../vendor/sendMsg');

// 发送短信验证码
const sendSmsCode = async phoneNumber => {
  // 1. 从缓存中获取验证码 查看是否过期
  // const smsCodeFromCache = (await getSmsCodeFromCache(phoneNumber)) || '';
  const smsCodeFromCache = '';
  if (smsCodeFromCache) {
    // 如果是: 本地开发环境 直接返回
    if (isDev) {
      return new SuccessModel({ code: smsCodeFromCache });
    }
    // 如果验证码存在 并且没有过期 不在重新发送
    return new ErrorModel(SEND_SMS_CODE_FREQUENCY);
  }

  // 2. 缓存中没有 则生成验证码
  const smsCode = createSmsCode();
  let isSendSuccess = false;
  if (isTest) {
    // 本地开发环境测试，不发送短信，直接返回验证码
    isSendSuccess = true;
  } else {
    try {
      // 发送短信验证码( 调用短信服务商的接口 )
      const result = await sendSmsCodeMsg(phoneNumber, smsCode);
      isSendSuccess = true;
    } catch (error) {
      isSendSuccess = false;
      console.error('发送短信验证码失败', error);
      // 邮件报警通知
    }
  }
  if (!isSendSuccess) {
    return new ErrorModel(SEND_SMS_CODE_FAIL);
  }

  // 3. 发送成功后，将验证码存储到缓存中
  await setSmsCodeToCache(phoneNumber, smsCode);

  // 4. 最终的返回结果( 本地开发环境返回验证码 线上环境返回 null )
  const finalSmsCode = isProd ? null : { code: smsCode };
  return new SuccessModel(finalSmsCode);
};

module.exports = sendSmsCode;
