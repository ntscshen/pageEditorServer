const User = require('../models/UserModel');
const { Work } = require('../models/WorkContentModel');
const WorkModel = require('../models/WorkModel');
const UserModel = require('../models/UserModel');
const sequelize = require('../db/seq');
const { Op } = require('sequelize');
const _ = require('lodash');

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

  console.log('mysql correctWork :>> ', correctWork);

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
 * 查询作品列表
 * 1. 容错处理
 * 2. 判断要更新的数据是否存在
 * 3. 更新的数据内容
 * 4. 更新 content - mongodb
 * 5. 走到这一步 mongodb数据更新成功 - 删除不需要更新的数据
 * 6. 更新作品信息 - mysql
 * 7. 返回更新结果
 * @param {object} whereOpt 查询条件
 * @param {object} data 更新的数据
 * @returns {object} 更新结果
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
  return result[0] !== 0;
}

// findMyWorksService 查询我的作品列表
async function findMyWorksService(whereOpt = {}, pageOpt = {}) {
  console.log('whereOpt :>> ', whereOpt);
  // 拼接查询条件
  let newWheres = {};
  const { title, status, isTemplate } = whereOpt;
  // 1. 处理模糊查询
  if (title) {
    newWheres = {
      ...newWheres,
      // title
      title: {
        [Op.like]: `%${title}%`,
      },
    };
    delete whereOpt.title;
  }
  // 2. 处理Boolean类型的查询
  if (isTemplate) {
    newWheres = {
      ...newWheres,
      isTemplate: !!isTemplate,
    };
    delete whereOpt.isTemplate;
  }
  // 3. 处理status
  if (status) {
    const newStatus = parseInt(status, 10);
    if (_.isNaN(newStatus)) {
      newWheres = {
        ...newWheres,
        status: {
          [Op.ne]: 0,
        },
      };
    } else {
      newWheres.status = newStatus;
    }
    delete whereOpt.status;
  }
  // 4. 处理其他查询条件
  _.forEach(whereOpt, (val, key) => {
    if (val == null) return;
    newWheres[key] = val;
  });

  console.log('newWheres :>> ', newWheres);
  console.log('pageOpt :>> ', pageOpt);

  // 拼接分页条件
  let { pageSize, pageIndex } = pageOpt;
  pageIndex = parseInt(pageIndex, 10) || 0; // 页码
  pageSize = parseInt(pageSize, 10) || 10; // 每页条数
  const newPageOpt = {
    limit: pageSize,
    offset: pageIndex * pageSize,
    // order: [
    //   ['orderIndex', 'desc'], // 倒序
    //   ['id', 'desc'], // 倒序。多个排序，按先后顺序确定优先级
    // ],
  };

  // findAndCountAll 是 Sequelize 提供的一个查询方法，用于查询符合条件的数据总数和数据列表

  /**
  * where: 查询条件
  * attributes: 查询的字段，可以是一个数组或字符串，表示要查询的字段列表
  * include: 包含关联模型，可以用来进行联表查询
  * limit: 查询的数据条数
  * offset: 跳过的数据条数
  * order: 排序规则
  *
  * */

  let result;
  try {
    result = await WorkModel.findAndCountAll({
      ...newPageOpt,
      where: newWheres,
      include: [
        // 关联 User
        {
          model: UserModel,
          attributes: ['userName', 'nickName', 'gender', 'picture'],
        },
      ],
    });
  } catch (error) {
    console.log('error :>> ', error);
  }
  console.log('result22222 :>> ', result);
  // findAndCountAll 方法返回一个包含两个属性的对象，分别是 rows 和 count，分别表示符合条件的数据列表和总条数。
  const list = result.rows.map(row => row.dataValues);

  return {
    count: result.count,
    list,
  };
}

module.exports = {
  createWorkService,
  findOneWorkService,
  updateWorksService,
  findMyWorksService,
};
