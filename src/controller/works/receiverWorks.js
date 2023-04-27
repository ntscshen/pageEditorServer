const { SuccessModel, ErrorModel } = require('../../resModel/index');
const { GIVE_WORKS_FAIL, GIVE_WORKS_DB_ERROR_FAIL } = require('../../resModel/failInfo/works');
const { getUserInfoByPhoneNumber } = require('../../service/users');
const { updateWorksService } = require('../../service/works');
// 转赠作品

// * 1. 作者和接收人不能相同
// * 2. 接收人必须存在
// * 3. 更新 author 字段
// * 4. 返回结果

// 这个本质上是修改作品内容
async function receiverWorks(id, author, receiver) {
  // 作者和接收人不能相同
  if (author === receiver) return new ErrorModel(GIVE_WORKS_FAIL, '作者和接收人不能相同');
  // 接收人必须存在
  const receiverExist = await getUserInfoByPhoneNumber(receiver);
  if (receiverExist === null) return new ErrorModel(GIVE_WORKS_FAIL, '接收人不存在');
  // 更新 author 字段
  let result;
  try {
    result = await updateWorksService(
      {
        id,
        author,
      },
      {
        author: receiver,
      },
    );
  } catch (error) {
    console.error('receiverWorks error :>> ', error);
    return new ErrorModel(GIVE_WORKS_DB_ERROR_FAIL);
  }

  // 转赠成功
  console.log('转赠成功 result :>> ', result);
  if (result) return new SuccessModel();
  // 转赠失败
  return new ErrorModel(GIVE_WORKS_FAIL);
}

module.exports = {
  receiverWorks,
};
