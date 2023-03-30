module.exports = {
  // mysql 配置
  mysqlConfig: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'aB123456',
    database: 'users_db',
  },
  // redis 配置
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
  },
  // cors 跨域配置
  corsOrigin: '*',
  // jwt 过期时间
  jwtExpire: 60 * 60 * 24 * 1, // 1天
};
