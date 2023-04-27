const { SuccessModel, ErrorModel } = require('../../resModel');
const { QUERY_WORK_FAIL, QUERY_WORK_DB_ERROR_FAIL } = require('../../resModel/failInfo/works');
const { findOneWorkService, findMyWorksService } = require('../../service/works');

/**
 * 查询单个作品
 * @param {string} id id
 * @param {string} author 用户名 保证安全性 作品作者和当前登录用户一致 防止查询到其他用户的作品
 *
 * 1. 容错处理 id 和 author 为空
 * 2. 查询数据库 try catch
 * 3. 查询失败
 * 4. 查询成功
 */
async function findOneWork(id, author) {
  if (!id || !author) return new ErrorModel(QUERY_WORK_FAIL);
  let result;
  try {
    result = await findOneWorkService({
      id,
      author,
    });
  } catch (error) {
    console.error('查询单个作品失败', error);
    return new ErrorModel(QUERY_WORK_DB_ERROR_FAIL);
  }
  // 查询失败
  if (result === null) return new ErrorModel(QUERY_WORK_FAIL);

  // 查询成功
  return new SuccessModel(result);
}

// 获取自己的作品列表或模板列表
async function findMyWorks(author, queryInfo, pageInfo) {
  console.log('queryInfo :>> ', queryInfo);
  const { id, uuid, title, status, isTemplate } = queryInfo;
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
        status,
        isTemplate: isTemplate === '1' ? true : false,
        author,
      },
      {
        pageIndex,
        pageSize,
      },
    );
  } catch (error) {
    console.error('查询自己的作品失败', error);
    return new ErrorModel(QUERY_WORK_DB_ERROR_FAIL, '获取自己的作品列表或模板列表 失败');
  }
  return new SuccessModel(result);
}

module.exports = { findOneWork, findMyWorks };
