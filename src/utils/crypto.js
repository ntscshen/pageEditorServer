const crypto = require('crypto');
const { PASSWORD_SECRET } = require('../config/constant');

// 加密
const _md5 = content => {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
};

// 加密
const doCrypto = content => {
  const str = `password=${content}&key=${PASSWORD_SECRET}`;
  return _md5(str);
};

module.exports = {
  doCrypto,
};
