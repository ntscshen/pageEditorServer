const devConf = require('./dev');

// 修改 redis 连接配置
Object.assign(devConf.redisConfig, {
  // docker-compose 中 redis 服务的名称 6373:6379
  host: 'editor-redis',
});
// 修改 mongodb 连接配置
Object.assign(devConf.mongodbConfig, {
  // docker-compose 中 mongodb 服务的名称 27013:27017
  url: 'editor-mongo',
});
// 修改 mysql 连接配置
Object.assign(devConf.mysqlConfig, {
  // docker-compose 中 mysql 服务的名称 3303:3306
  host: 'editor-mysql',
});

console.log('数据连接配置 devConf :>> ', devConf);

module.exports = devConf;

