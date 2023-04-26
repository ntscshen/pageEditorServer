// res 数据模型
// 定义 res 数据模型，方便统一管理
// 定义错误码和错误信息

class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno;
    if (data) this.data = data;
    if (message) this.message = message;
  }
}
// 执行失败的数据模型
class ErrorModel extends BaseModel {
  constructor({ errno = -1, message = '', data }, addMessage) {
    super({
      errno,
      message: addMessage
      ? `${message} - ${addMessage}` // 追加信息
      : message,
      data,
    });
  }
}

class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data,
    });
  }
}

module.exports = {
  ErrorModel,
  SuccessModel,
};
