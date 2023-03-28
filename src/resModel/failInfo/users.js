// 错误信息配置
module.exports = {
  // 登录校验失败
  LOGIN_CHECK_FAIL: {
    errno: 10001,
    msg: '登录校验失败',
  },
  // 发送短信验证码过于频繁
  SEND_SMS_CODE_FREQUENCY: {
    errno: 12002,
    msg: '发送短信验证码过于频繁',
  },
  // 发送短信验证码失败
  SEND_SMS_CODE_FAIL: {
    errno: 12003,
    msg: '发送短信验证码失败， 请稍后再试',
  },
  // 短信验证码错误
  SMS_CODE_ERROR: {
    errno: 12004,
    msg: '短信验证码错误',
  },
  // 用户已被禁用
  USER_IS_DISABLED: {
    errno: 12005,
    msg: '用户已被禁用',
  },
  // 创建用户失败
  CREATE_USER_FAIL: {
    errno: 12006,
    msg: '创建用户失败',
  },
  // 修改用户信息，写入数据库失败
  UPDATE_USER_INFO_DB_FAIL: {
    errno: 12007,
    msg: '修改用户信息，写入数据库失败',
  },
  // 修改用户信息失败
  UPDATE_USER_INFO_FAIL: {
    errno: 12008,
    msg: '更新用户信息失败',
  },
};
