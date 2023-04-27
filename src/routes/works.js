const router = require('koa-router')();
const { worksSchema } = require('../validator/works');

// controller
const { createWorks, copyWorks } = require('../controller/works/createWorks');
const { findOneWork, findMyWorks } = require('../controller/works/findWorks');
const { updateWorks } = require('../controller/works/updateWorks');
const { deleteWorks, recoverWorks } = require('../controller/works/deleteWorks');
const { receiverWorks } = require('../controller/works/receiverWorks');

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
  const result = await updateWorks(id, userName, ctx.request.body);
  ctx.body = result;
});

// 复制作品
router.post('/copy/:id', loginCheck, async ctx => {
  const { id } = ctx.params;
  const { userName } = ctx.userInfo;
  const result = await copyWorks(id, userName);
  ctx.body = result;
});

// 删除作品
router.delete('/:id', loginCheck, async ctx => {
  const { id } = ctx.params;
  const { userName } = ctx.userInfo;
  const result = await deleteWorks(id, userName);
  ctx.body = result;
});

// 恢复删除作品
router.patch('/recover/:id', loginCheck, async ctx => {
  const { id } = ctx.params;
  const { userName } = ctx.userInfo;
  const result = await recoverWorks(id, userName, true);
  ctx.body = result;
});

// 转赠作品
router.post('/receiver/:id/:receiver', loginCheck, async ctx => {
  const { id, receiver } = ctx.params;
  const { userName } = ctx.userInfo;
  const result = await receiverWorks(id, userName, receiver);
  ctx.body = result;
});

// 获取自己的作品列表或模板列表
router.get('/', loginCheck, async ctx => {
  const { userName } = ctx.userInfo;
  const { id, uuid, author, title, status, isTemplate = '0', pageIndex, pageSize } = ctx.query;
  console.log('ctx.userInfo :>> ', ctx.userInfo);
  console.log('ctx.query :>> ', ctx.query);

  const result = await findMyWorks(userName, { id, uuid, title, status, isTemplate }, { pageIndex, pageSize });
  ctx.body = result;
});

module.exports = router;
