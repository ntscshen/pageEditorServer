module.exports = {
  // 密码加密 用于加密密码
  PASSWORD_SECRET: 'ntscshen',
  // jwt secret 秘钥
  JWT_SECRET: 'ntscshen',
  // jwt ignore url 不需要验证的 url( 忽略所有的路由 用自己的 loginCheck 中间件验证 )
  JWT_IGNORE_URL: [/\//],
};
