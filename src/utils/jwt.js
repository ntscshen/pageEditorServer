const util = require('util');
const jwt = require('jsonwebtoken');
const { jwtExpire } = require('../config/dev');
const { JWT_SECRET } = require('../config/constant');

const verify = util.promisify(jwt.verify);

// jwt verify 解密
const jwtVerify = async token => {
  try {
    const data = await verify(token.split[' '][1], JWT_SECRET);
    return data;
  } catch (error) {
    console.error('jwt verify error', error);
    return false;
  }
};

// jwt sign 加密
const jwtSign = (data = {}) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: jwtExpire,
  });
};

module.exports = {
  jwtVerify,
  jwtSign,
};
