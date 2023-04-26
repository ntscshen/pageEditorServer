const Ajv = require('ajv');
const ajv = new Ajv({
  allErrors: true, // 输出所有的错误
});

// 生成校验函数
function validator(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0];
  }
  return null;
}

function generateValidator(schema) {
  return async (ctx, next) => {
    const data = ctx.request.body;
    const validateError = validator(schema, data);
    if (validateError) {
      ctx.body = {
        errno: 11001,
        message: '输入数据格式错误',
        data: validateError, // 将错误信息返回给前端
      };
      return;
    }
    console.log('Validator The test was successful >> (next next next)');
    await next();
  };
}

module.exports = generateValidator;
