const Sequelize = require('sequelize');
// 1. 创建 User 模型 ( 表 ) 数据表的名字是 users
const User = req.define('user', {
  // id 会自动创建，并设为主键，自动创建
  username: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false,
    unique: 'username',
    comment: '用户名，唯一',
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码',
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'username',
    comment: '手机号，唯一',
  },
});



module.exports = {
  User,
};
