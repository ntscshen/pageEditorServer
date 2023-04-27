const sequelize = require('../seq');
const { isDev } = require('../../utils/env');
// 同步sql数据库
async function syncDb() {
  if (isDev) {
    // 自动同步数据库中的模型和定义中的模型，可以将缺失的表和字段自动添加到数据库中。
    // 当设置force: true时，它会先删除已有的表，然后重新创建新的表，这个选项在开发环境中常用于快速重置数据库的结构，但在生产环境中不建议使用，因为会导致数据的丢失。
    await sequelize.sync({ force: true });
  }
}

module.exports = syncDb;
