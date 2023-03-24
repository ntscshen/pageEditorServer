// 错误信息配置
module.exports = {
  // 发送短信验证码过于频繁
  SEND_SMS_CODE_FREQUENCY: {
    errno: 12002,
    msg: '发送短信验证码过于频繁',
  },
  // SEND_SMS_CODE_FAIL
  SEND_SMS_CODE_FAIL: {
    errno: 12003,
    msg: '发送短信验证码失败， 请稍后再试',
  },
};
