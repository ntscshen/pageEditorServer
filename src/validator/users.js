// 手机号规则
const phoneNumberRule = {
  type: 'string',
  pattern: '^1[3456789]\\d{9}$',
};

// 手机号 Schema
const phoneNumberSchema = {
  type: 'object',
  required: ['phoneNumber'],
  properties: {
    phoneNumber: phoneNumberRule,
  },
};

// 手机号 + 短信验证码 Scheam
// 前端输入的数据，必须满足当前的ajv格式才可以 否则 会报错
const phoneNumberAndSmsCodeSchema = {
  type: 'object',
  required: ['phoneNumber', 'smsCode'],
  properties: {
    phoneNumber: phoneNumberRule,
    smsCode: {
      type: 'string',
      pattern: '^\\d{6}$', // 6 位数字
    },
  },
};

// 用户信息 Schema
const getUserInfoSchema = {
  type: 'object',
  required: ['nickName', 'gender'],
  properties: {
    nickName: {
      // 昵称
      type: 'string',
    },
    gender: {
      // 性别
      type: 'integer', // 0 男 1 女 2 保密 integer n. 整数
      minimum: 0,
      maximum: 2,
    },
    picture: {
      // 头像
      type: 'string',
    },
    city: {
      // 城市
      type: 'string',
    },
  },
};

module.exports = {
  phoneNumberSchema,
  phoneNumberAndSmsCodeSchema,
  getUserInfoSchema,
};
