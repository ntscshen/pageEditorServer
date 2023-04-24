const { UPDATE_USER_INFO_FAIL, UPDATE_USER_INFO_DB_FAIL } = require('../../resModel/failInfo/users');
const { updateUserInfo } = require('../../service/users');
const { ErrorModel, SuccessModel } = require('../../resModel');
const { jwtSign } = require('../../utils/jwt');

// 修改用户信息
const updateUserInfoController = async (curUserInfo, data = {}) => {
  if (curUserInfo === null) return null;
  if (Object.keys(data).length === 0) return null;
  const { id } = curUserInfo;
  let res = null;
  try {
    res = await updateUserInfo(id, data);
  } catch (error) {
    console.error('修改用户信息失败', error);
    return new ErrorModel(UPDATE_USER_INFO_DB_FAIL); // 数据库操作失败
  }

  // 修改成功
  if (res) {
    const newUserInfo = Object.assign({}, curUserInfo, data);
    return new SuccessModel({
      token: jwtSign(newUserInfo, false),
    });
  }
  // 修改失败
  return new ErrorModel(UPDATE_USER_INFO_FAIL); // 修改用户信息失败
};

module.exports = { updateUserInfoController };
