// 模板路由
const router = require('koa-router')();

// controller
const { findPublicTemplates, findOneTemplate } = require('../controller/works/findTemplate');

// 路由前缀
router.prefix('/api/template');

// 获取公共模板
router.get('/', async ctx => {
  const { id, uuid, title, pageIndex, pageSize } = ctx.query;
  const result = await findPublicTemplates({ id, uuid, title }, { pageIndex, pageSize });
  ctx.body = result;
});

// 获取单个模板信息
router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const result = await findOneTemplate(id);
  ctx.body = result;
});

module.exports = router;
