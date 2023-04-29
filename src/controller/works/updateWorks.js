const { SuccessModel, ErrorModel } = require('../../resModel');
const { UPDATE_WORKS_FAIL, UPDATE_WORKS_DB_ERROR_FAIL } = require('../../resModel/failInfo/works');
const { updateWorksService } = require('../../service/works');
/**
 * 修改作品
 * @param {number} id 作品id
 * @param {string} author 作品作者
 * @param {object} data 作品数据
 * @returns {object} 修改结果
 * */
async function updateWorks(id, author, data = {}) {
  console.log('id :>> ', id);
  console.log('author :>> ', author);
  console.log('data :>> ', data);

  // 修改作品失败
  if (!id || !author) return new ErrorModel(UPDATE_WORKS_FAIL, 'id 或 author 不能为空');
  if (Object.keys(data).length === 0) return new ErrorModel(UPDATE_WORKS_FAIL, '更新数据 data 不能为空');

  let result;
  try {
    result = await updateWorksService({ id, author }, data);
  } catch (error) {
    console.error('修改作品失败', error);
    return new ErrorModel(UPDATE_WORKS_DB_ERROR_FAIL);
  }
  if (result) return new SuccessModel(result);
  // 修改作品失败
  return new ErrorModel(UPDATE_WORKS_FAIL, 'id 或 author 不匹配');
}

module.exports = { updateWorks };