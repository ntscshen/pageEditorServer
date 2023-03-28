// 前缀
// 缓存前缀
const PREFIX = 'phoneSmsCode:';

// 从缓存中获取验证码
const getSmsCodeFromCache = async phoneNumber => {
  const key = `${PREFIX}${phone}`;
  // const code = await redis.get(key);
  if (code === null) {
    return null;
  }
  return code.toString();
};

// 设置验证码到缓存中
const setSmsCodeToCache = async (phoneNumber, code) => {
  const key = `${PREFIX}${phone}`;
  // await redis.set(key, code);
};


module.exports = {
  getSmsCodeFromCache,
  setSmsCodeToCache,
};
