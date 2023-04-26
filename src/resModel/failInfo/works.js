// 错误信息配置
module.exports = {
  // 作品不存在
  WORK_NOT_EXIST: {
    errno: 13000,
    message: '作品不存在',
  },
  // 创建作品失败
  CREATE_WORKS_FAIL: {
    errno: 13001,
    message: '创建作品失败 db error',
  },
  // 查询作品失败
  QUERY_WORK_FAIL: {
    errno: 13002,
    message: '查询作品失败',
  },
  // 查询作品失败 db error
  QUERY_WORK_DB_ERROR_FAIL: {
    errno: 13003,
    message: '查询作品失败 db error',
  },
  // 修改作品失败
  UPDATE_WORKS_FAIL: {
    errno: 13004,
    message: '修改作品失败',
  },
  // 修改作品失败，数据库错误
  UPDATE_WORKS_DB_ERROR_FAIL: {
    errno: 13005,
    message: '修改作品失败 db error',
  },
  // 强制下线
  FORCE_OFFLINE: {
    errno: 13006,
    message: '作品已被强制下线',
  },
};
