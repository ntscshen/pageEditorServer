const util = require('util');
const jwt = require('jsonwebtoken');
const { jwtExpire } = require('../config/dev');
const { JWT_SECRET } = require('../config/constant');

const verify = util.promisify(jwt.verify);

// jwt verify 解密
const jwtVerify = async token => {
  try {
    const data = await verify(String(token).split(' ')[1], JWT_SECRET);
    return data;
  } catch (error) {
    console.error('jwt verify error', error);
    return false;
  }
};

// jwt sign 加密
// isExp 是否设置过期时间 expiresIn和exp 两个选项不能同时设置，第二次设置expiresIn会报错
const jwtSign = (data = {}, isExp = true) => {
  let options = {};
  if (isExp) {
    options = {
      expiresIn: jwtExpire,
    };
  } else {
    options = {};
  }
  return jwt.sign(data, JWT_SECRET, options);
};

module.exports = {
  jwtVerify,
  jwtSign,
};
