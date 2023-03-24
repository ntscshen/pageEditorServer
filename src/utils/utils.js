// 生成6位验证码
function createSmsCode() {
  return Math.random().toString().slice(-6);
}
// 一分钟过期时间
const SMS_CODE_EXPIRE_TIME = 60 * 1000;

module.exports = {
  createSmsCode,
  SMS_CODE_EXPIRE_TIME,
};
