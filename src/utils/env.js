// 环境变量
const env = process.env.NODE_ENV || '';
console.log('env :>> ', env);
module.exports = {
  isDev: env === 'development',
  isProd: env === 'production',
  isTest: env === 'test',
};
