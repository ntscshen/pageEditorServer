// mysql2 连接测试
const mysql = require('mysql2/promise');
const { mysqlConfig } = require('../config/dev');
const { host, port, user, password, database } = mysqlConfig;
const connection = mysql.createPool({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


module.exports = connection;
