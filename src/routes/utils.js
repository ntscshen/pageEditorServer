// 模板路由
const router = require('koa-router')();

// controller
const { uploadImg } = require('../controller/utils/index');

// 路由前缀
router.prefix('/api/utils');

// 上传图片（form-data 形式，支持多文件上传） loginCheck 暂时不加(为了方便测试)
router.post('/upload-img', async ctx => {
  const result = await uploadImg(ctx.req);
  ctx.body = result;
});

module.exports = router;
