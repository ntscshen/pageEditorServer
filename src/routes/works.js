const router = require('koa-router')();
const { worksSchema } = require('../validator/works');

// controller
const { createWorks, copyWorks } = require('../controller/works/createWorks');
const { findOneWork } = require('../controller/works/findWorks');
const { updateWorks } = require('../controller/works/updateWorks');

// 中间件
const { loginCheck } = require('../middlewares/loginCheck'); // 登录校验
const generateValidator = require('../middlewares/genValidator'); // 入参校验器

// 路由前缀
router.prefix('/api/works');

// 创建空白作品
router.post('/', loginCheck, generateValidator(worksSchema), async (ctx, next) => {
  const { userName } = ctx.userInfo;
  const { title, desc, content = {} } = ctx.request.body;
  const result = await createWorks(userName, { title, desc }, content);
  ctx.body = result;
});

// 查询单个作品 - 作品详情
router.get('/:id', loginCheck, async ctx => {
  // (id && userName) 同时存在才能进行查找
  const { id } = ctx.params;
  const { userName } = ctx.userInfo;
  const result = await findOneWork(id, userName);
  ctx.body = result;
});

// 修改作品信息
router.patch('/:id', loginCheck, async ctx => {
  const { id } = ctx.params;
  const { userName } = ctx.userInfo;
  const result = await updateWorks(id, userName);
  ctx.body = result;
});

// 复制作品
router.post('/copy/:id', loginCheck, async ctx => {
  const { id } = ctx.params;
  const { userName } = ctx.userInfo;
  const result = await copyWorks(id, userName);
  ctx.body = result;
});

module.exports = router;
