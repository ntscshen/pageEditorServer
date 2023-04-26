const { SuccessModel, ErrorModel } = require('../../resModel');
const { QUERY_WORK_FAIL } = require('../../resModel/failInfo/works');
const { findOneWorkService } = require('../../service/works');
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
module.exports = { findOneWork };
