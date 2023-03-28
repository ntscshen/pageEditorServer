const { ErrorModel } = require('../resModel');
const { LOGIN_CHECK_FAIL } = require('../resModel/failInfo/users');
const { jwtVerify } = require('../utils/jwt');

// 登录校验中间件
const loginCheck = async (ctx, next) => {
  // 失败信息
  const failInfo = new ErrorModel(LOGIN_CHECK_FAIL);
  // 1. 获取 token
  const token = ctx.header.authorization;
  if (!token) {
    ctx.body = failInfo;
    return;
  }
  // 2. 校验 token
  let flag = true;
  try {
    const userInfo = await jwtVerify(token);
    // 验证成功 - 将用户信息挂载到 ctx 上
    ctx.userInfo = userInfo;
  } catch (error) {
    flag = false;
    ctx.body = failInfo;
  }

  if (flag) {
    // 继续下一个
    await next();
  }
};

module.exports = { loginCheck };
