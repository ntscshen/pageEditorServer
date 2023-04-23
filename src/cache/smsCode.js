const Redis = require('redis');
const redisClient = require('../db/redis');
// 缓存前缀
const PREFIX = 'phoneSmsCode:';

// 从缓存中获取验证码
const getSmsCodeFromCache = async phoneNumber => {
  const key = `${PREFIX}${phoneNumber}`;
  console.log('setSmsCodeToCache key :>> ', key);
  const code = await redisClient.get(key);
  console.log('code :>> ', code);
  if (code === null) {
    return null;
  }
  return code.toString();
};

// 设置验证码到缓存中
const setSmsCodeToCache = async (phoneNumber, code) => {
  const key = `${PREFIX}${phoneNumber}`;
  console.log('setSmsCodeToCache :>> ', key);
  await redisClient.set(key, code);
};

module.exports = {
  getSmsCodeFromCache,
  setSmsCodeToCache,
};
