const Sequelize = require('sequelize');
const { mysqlConfig } = require('./dev');
const { host, port, user, password, database } = mysqlConfig;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: 'mysql',
  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000,
  // },
  // define: {
  //   timestamps: false,
  // },
});

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    console.log('连接已成功建立.');
    // Connection has been established successfully 翻译
    // 连接已成功建立
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    console.error('无法连接到数据库:', err);
    // Unable to connect to the database 翻译
    // 无法连接到数据库
  });
