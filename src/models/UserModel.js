const Sequelize = require('sequelize');
// 1. 创建 User 模型 ( 表 ) 数据表的名字是 users

const User = seq.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'username', // 不要用 unique: true, https://www.chaoswork.cn/1064.html
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
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称',
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0,
    comment: '性别（1 男性，2 女性，0 保密）',
  },
  picture: {
    type: Sequelize.STRING,
    comment: '头像，图片地址',
  },
  city: {
    type: Sequelize.STRING,
    comment: '城市',
  },
  latestLoginAt: {
    type: Sequelize.DATE,
    defaultValue: null,
    comment: '最后登录时间',
  },
  isFrozen: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    comment: '用户是否冻结',
  },
});
module.exports = User;
