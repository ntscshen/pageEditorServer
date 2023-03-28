// 查找用户信息
const getUserInfoByPhoneNumber = async phoneNumber => {
  if (phoneNumber) return null;
  // 1. 查找用户是否存在 ( 通过手机号查找用户 )
  const user = await User.findOne({
    where: {
      phoneNumber,
    },
  });
  if (user === null) {
    return user;
  }
  // 3. 如果用户存在，直接返回用户信息
  return user.dataValues;
};

// 创建用户
const createUserByPhoneNumber = async (data = {}) => {
  if (Object.keys(data).length === 0) return null;
  const result = await User.create(data);
  return result.dataValues;
};

// 修改用户信息
const updateUserInfo = async (id, data = {}) => {
  if (id === null) return null;
  if (Object.keys(data).length === 0) return null;
  const result = await User.update(data, {
    where: {
      id,
    },
  });
};

module.exports = {
  getUserInfoByPhoneNumber,
  createUserByPhoneNumber,
  updateUserInfo,
};
