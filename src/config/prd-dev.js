const devConf = require('./dev');

// 修改 redis 连接配置
Object.assign(devConf.redisConfig, {
  // docker-compose 中 redis 服务的名称
  host: 'editor-redis',
});

console.log('redis 连接配置 devConf :>> ', devConf);

module.exports = devConf;
