const { updateWorksService } = require('../../service/works');
const { DELETE_WORKS_FAIL, DELETE_WORKS_DB_ERROR_FAIL } = require('../../resModel/failInfo/works');
const { SuccessModel, ErrorModel } = require('../../resModel/index');
/**
 * 删除作品
 * @param {number} id 作品id
 * @param {string} author 用户名
 * @param {boolean} isRecover 是否恢复删除
 * */
async function deleteWorks(id, author, isRecover = false) {
  const status = isRecover ? 1 : 0; // 软删除 0: 删除 1: 恢复删除
  let result;
  try {
    result = await updateWorksService(
      {
        id,
        author,
      },
      {
        status,
      },
    );
  } catch (error) {
    console.error('deleteWorks error :>> ', error);
    return new ErrorModel(DELETE_WORKS_DB_ERROR_FAIL);
  }

  // 删除成功
  if (result) return new SuccessModel();
  // 删除失败
  return new ErrorModel(DELETE_WORKS_FAIL);
}
// 恢复删除
async function recoverWorks(id, author) {
  return await deleteWorks(id, author, true);
}

module.exports = {
  deleteWorks,
  recoverWorks,
};
