const jwtKoa = require('koa-jwt');
const { JWT_SECRET, JWT_IGNORE_URL } = require('../config/constant');

module.exports = jwtKoa({
  secret: JWT_SECRET,
  cookie: 'token', // 使用 cookie 保存 token
}).unless({
  // 设置 jwt 中间件白名单
  path: JWT_IGNORE_URL,
});
