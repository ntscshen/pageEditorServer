// 配置 Sequelize 连接数据库

const Sequelize = require('sequelize');
const { mysqlConfig } = require('../config');
const { isProd } = require('../utils/env');

const { host, port, user, password, database } = mysqlConfig;
const config = {
  host: host,
  port: port,
  dialect: 'mysql',
};

// 线上环境，使用连接池
if (isProd) {
  // 连接池配置
  config.pool = {
    max: 5, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  };
}
console.log('database, user, password, config :>> ', database, user, password, config);
// database, user, password, config :>>
// editor_server_mysql_db root aB123456 { host: '127.0.0.1', port: 3306, dialect: 'mysql' }
const sequelize = new Sequelize(database, user, password, config);

module.exports = sequelize;
