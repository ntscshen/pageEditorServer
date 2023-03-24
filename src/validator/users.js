// 手机号 Schema
const phoneNumberSchema = {
  type: 'object',
  required: ['phoneNumber'],
  properties: {
    phoneNumber: {
      type: 'string',
      pattern: '^1[3456789]\\d{9}$',
    },
  },
};

// 手机号 + 短信验证码 Scheam
const phoneNumberAndSmsCodeSchema = {
  type: 'object',
  properties: {
    phoneNumber: {
      type: 'string',
      pattern: '^1[3456789]\\d{9}$',
    },
    smsCode: {
      type: 'string',
      pattern: '^\\d{6}$',
    },
  },
};

// 用户信息 Schema
const getUserInfoSchema = {
  type: 'object',
  properties: {
    nickName: {
      type: 'string',
    },
    gender: {
      type: 'integer', // 0 男 1 女 2 保密 integer n. 整数
      minimum: 0,
      maximum: 2,
    },
    picture: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
  },
};

module.exports = {
  phoneNumberSchema,
  phoneNumberAndSmsCodeSchema,
  getUserInfoSchema,
};
