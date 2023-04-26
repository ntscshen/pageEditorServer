const User = require('../models/UserModel');
const { Work } = require('../models/WorkContentModel');
const WorkModel = require('../models/WorkModel');
const UserModel = require('../models/UserModel');
const sequelize = require('../db/seq');

// 创建作品
async function createWorkService(data = {}, content = {}) {
  const { components = {}, props = {}, setting = {} } = content;
  const { title, desc, coverImg } = data;
  console.log('data :>> ', data);
  // 创建作品内容 mongodb
  const mongodbNewContent = await Work.create({
    components,
    props,
    setting,
  });
  console.log('mongodbNewContent :>> ', mongodbNewContent);
  const { _id: contentId } = mongodbNewContent;
  console.log('contentId :>> ', contentId);
  console.log('data :>> ', data);

  await sequelize.sync();
  // 创建作品信息 mysql
  const mysqlNewWork = await WorkModel.create({
    ...data, // 作品信息
    // title,
    // desc,
    // coverImg,
    contentId: contentId.toString(), // mongodb 生成的 _id 是 object 类型，需要转换为 string 类型
  });
  console.log('mysqlNewWork :>> ', mysqlNewWork.dataValues);
  return mysqlNewWork.dataValues;
}

// 查询单个作品
/**
 * 1. 容错处理
 * 2. 查询作品信息 mysql
 * 3. 查询作品内容 mongodb
 * 4. 拼接作品信息和作品内容
 * 5. 返回查询结果
 * @param {object} whereOpt 查询条件
 * @returns {object} 查询结果
 * */
async function findOneWorkService(whereOpt) {
  Object.keys(whereOpt).length === 0 && null; // 无查询条件
  // 查询作品信息 mysql
  console.log('查询作品信息 mysql :>> ', '查询作品信息 mysql');
  console.log('whereOpt :>> ', whereOpt);
  const result = await WorkModel.findOne({
    where: whereOpt,
    include: [
      {
        model: UserModel,
        attributes: ['userName', 'nickName', 'gender', 'picture'],
      },
    ],
  });
  if (result === null) {
    // 也可能是null，表示查询未返回任何结果
    console.error('no result found');
    return result;
  }
  // 正确的查询结果
  const correctWork = result.dataValues;
  // console.log('correctWork :>> ', correctWork);
  // 查询作品内容 mongodb
  const { contentId } = correctWork;
  await sequelize.sync();
  const content = await Work.findById(contentId);
  // 拼接作品信息和作品内容
  return {
    ...correctWork,
    content,
  };
}
/**
 * */
async function updateWorksService(whereOpt = {}, data = {}) {
  // 容错处理
  if (Object.keys(whereOpt).length === 0) return null;
  if (Object.keys(data).length === 0) return null;

  // 判断要更新的数据是否存在
  const workExist = await findOneWorkService(whereOpt);
  if (workExist === null) {
    console.error('work not exist 判断要更新的数据不存在');
    return null;
  }

  // 更新的数据内容
  const newData = { ...data };

  // 更新 content - mongodb
  const { contentId } = workExist;
  const { component } = newData;
  if (component) {
    const { components, props, setting } = component;
    await Work.findByIdAndUpdate(contentId, {
      components,
      props,
      setting,
    });
  }

  // 走到这一步 mongodb数据更新成功 - 删除不需要更新的数据
  delete newData.id;
  delete newData.uuid;
  delete newData.content;
  delete newData.contentId;

  if (newData === null) {
    // 用户可能只更新了 content
    return true;
  }

  // 更新作品数据 - mysql
  const result = await WorkModel.update(newData, {
    where: whereOpt,
  });
  // update方法返回一个数组，数组中的第一个元素表示被更新的行数, 如果result[0]不等于0，说明有行数据被更新
  return result[0] !== 0
}

module.exports = {
  createWorkService,
  findOneWorkService,
  updateWorksService,
};
