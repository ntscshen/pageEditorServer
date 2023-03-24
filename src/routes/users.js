const sendSmsCode = require('../controller/users/sendSmsCode');
const generateValidator = require('../middlewares/genValidator');
const { phoneNumberSchema } = require('../validator/users');

const router = require('koa-router')();

// 路由前缀
router.prefix('/api/users');

// 为什么要添加中间件？
// 如果前端按照正确的格式传递了参数，没有任何问题，如果没有按照正确的格式传递参数，就会报错
// 当前中间件就是做这个事情的
// 如果有这个中间件，前端请求的时候，就会先执行这个中间件，然后再执行下面的路由
// 如果手机号格式不对的话，在当前中间件中就会报错，然后就不会执行下面的路由了

// 生成短信验证码
/**
 * 路由里面没有任何逻辑
 * 1. 做必要的验证
 * 2. 获取相关信息
 * 3. 调用相关的方法( 直接把数据扔给 controller 处理 )
 * */

router.post('/generateSmsCode', generateValidator(phoneNumberSchema), async (ctx, next) => {
  // 1. 验证手机号是否正确 generateValidator(phoneNumberSchema)
  const { phoneNumber } = ctx.request.body;
  // 2. 发送短信验证码
  const res = await sendSmsCode(phoneNumber);
  ctx.body = res;
});


// 使用手机号登录
router.post('/loginByPhone', async (ctx, next) => {});

// 获取用户信息
router.get('/getUserInfo', async (ctx, next) => {});

// 修改用户信息
router.patch('/updateUserInfo', async (ctx, next) => {});

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!11';
});

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
