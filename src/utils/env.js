// 环境变量
const env = process.env.NODE_ENV || '';
console.log('env :>> ', env);
module.exports = {
  isDev: env === 'development', // 开发环境
  isProDev: env === 'prd_dev', // 预发布环境
  isProd: env === 'production',
  isTest: env === 'test',
};
