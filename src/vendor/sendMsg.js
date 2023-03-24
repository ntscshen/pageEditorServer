// 发送短信验证码
const sendSmsCodeMsg = (phone, code) => {
  if (!phone || !code) {
    return Promise.reject('手机号或验证码不能为空');
  }
  return Promise.resolve('ok'); // 模拟发送成功
};

module.exports = {
  sendSmsCodeMsg,
};
