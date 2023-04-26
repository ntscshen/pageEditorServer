// 作品Model
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const User = require('./UserModel');

const WorkModel = seq.define('work', {
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'uuid',
    comment: 'uuid，h5 url 中使用，隐藏真正的 id，避免被爬虫',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '作品标题',
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '作品描述',
  },
  coverImg: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '作品封面 url',
  },
  contentId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '作品内容 id，存储在 mongodb中，关联 workContent 表',
  },
  publishContentId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: 'publishContentId',
    comment: '发布作品内容 id，存储在 mongodb中，未发布时为 null，关联 workContent 表',
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '作者 username',
  },
  isTemplate: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否为模板',
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '作品状态，0：删除，1：未发布 2：已发布 3：已下架',
  },
  copiedCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '被复制的次数',
  },
  lastestPublishTime: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '最近一次发布时间',
  },
  isHot: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否为热门作品',
  },
  isNew: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否为新作品',
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '排序索引',
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否公开 在首页公共的模板列表 0：不公开 1：公开 ',
  },
});

// 外键关联 User 表 ( 作品表关联用户表 ) 一对一 ( 一个作品对应一个用户 ) 作品表的外键字段为 author，用户表的目标字段为 username
//  作品表的外键字段为 author，用户表的目标字段为 username
//  作品表的外键字段为 author，用户表的目标字段为 username
WorkModel.belongsTo(User, {
  // 作品表关联用户表
  foreignKey: 'author', // 作品表的外键字段
  targetKey: 'userName', // 用户表的目标字段
});// 作品表关联用户表

module.exports = WorkModel;
