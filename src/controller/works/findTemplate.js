const { SuccessModel, ErrorModel } = require('../../resModel/index');
const { QUERY_WORK_FAIL, QUERY_WORK_DB_ERROR_FAIL } = require('../../resModel/failInfo/works');
const { findMyWorksService, findOneWorkService } = require('../../service/works');

// 隐藏手机号
function hidePhoneNumber(phoneNumber) {
  const newPhoneNumber = phoneNumber?.toString();
  if (!newPhoneNumber) return newPhoneNumber;
  return newPhoneNumber.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
}

/**
 * 格式化模板
 * @param {object} template 模板
 * */
function formatTemplate(template = {}) {
  if (Array.isArray(template)) {
    return template.map(t => formatTemplate(t));
  }
  if (Array.isArray(template?.list)) {
    return formatTemplate(template?.list);
  }
  const newTemplate = { ...template };
  // 用户名若是手机号，则隐藏手机号
  // 用户author若是手机号，则隐藏手机号
  // 用户user字段中 userName 若是手机号，则隐藏手机号
  newTemplate.author = hidePhoneNumber(newTemplate.author);
  if (newTemplate.user) {
    const user = newTemplate.user.dataValues;
    user.userName = hidePhoneNumber(user.userName);
  }
  return newTemplate;
}

/**
 * 查询公共模板
 * @param {object} queryInfo 查询条件
 * @param {number} queryInfo.id 作品id
 * @param {string} queryInfo.uuid 作品uuid
 * @param {string} queryInfo.title 作品标题
 * @param {object} pageInfo 分页信息
 * @param {number} pageInfo.pageIndex 页码
 * @param {number} pageInfo.pageSize 每页条数
 * @returns {object} 查询结果
 * */
async function findPublicTemplates(queryInfo, pageInfo) {
  const { id, uuid, title } = queryInfo;
  let { pageIndex, pageSize } = pageInfo;
  // 容错处理( 保证不为空，并且符合规范 )
  pageIndex = parseInt(pageIndex, 10) || 0;
  pageSize = parseInt(pageSize, 10) || 10;

  // 查询数据库
  let result;
  try {
    result = await findMyWorksService(
      {
        id,
        uuid,
        title,
        isTemplate: true,
        isPublic: true,
      },
      {
        pageIndex,
        pageSize,
      },
    );
  } catch (error) {
    console.error('查询公共模板失败', error);
    return new ErrorModel(QUERY_WORK_DB_ERROR_FAIL);
  }
  console.log('11111111result :>> ', result);
  result = formatTemplate(result);
  return new SuccessModel(result);
}

/**
 * 查询单个模板
 * @param {number} id 作品id
 * @returns {object} 查询结果
 * */
async function findOneTemplate(id) {
  if (!id) return new ErrorModel(QUERY_WORK_DB_ERROR_FAIL, 'id 不能为空');
  let result;
  try {
    result = await findOneWorkService({ id, isTemplate: true, isPublic: true });
  } catch (error) {
    console.error('查询单个模板失败', error);
    return new ErrorModel(QUERY_WORK_DB_ERROR_FAIL, 'db error');
  }
  // 作品查询失败
  if (!result) return new ErrorModel(QUERY_WORK_FAIL, '查询失败');
  // 作品查询成功
  result = formatTemplate(result);
  return new SuccessModel(result);
}

module.exports = {
  findPublicTemplates,
  findOneTemplate,
};
