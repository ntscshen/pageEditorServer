const sendSmsCode = require('../controller/users/sendSmsCode');
const loginByPhoneNumber = require('../controller/users/loginByPhoneNumber');
const generateValidator = require('../middlewares/genValidator');
const { phoneNumberSchema, phoneNumberAndSmsCodeSchema, getUserInfoSchema } = require('../validator/users');
const { loginCheck } = require('../middlewares/loginCheck');
const { SuccessModel } = require('../resModel');
const { updateUserInfoController } = require('../controller/users/updateUserInfo');
const redisClient = require('../db/redis');
const connection = require('../db/mysql2');
const mongoose = require('../db/mongoose');
const dayjs = require('dayjs');

const router = require('koa-router')();

// 路由前缀
router.prefix('/api/users');

// 测试 mysql 连接

router.get('/db-check', async (ctx, next) => {
  // 1. 测试 redis 连接
  console.time('redis');
  redisClient.set('now', 'redis测试成功');
  const redisExecultNow = await redisClient.get('now');
  console.timeEnd('redis');

  // 2. 测试 mysql 连接
  console.time('mysql');
  const mysqlExecult = await connection.execute('SELECT NOW();');
  const mysqlExecultNow = mysqlExecult[0][0]['NOW()'];
  const currentDate = dayjs(mysqlExecultNow).format('YYYY-MM-DD HH:mm:ss');
  console.timeEnd('mysql');

  // 3. 测试 mongodb 连接
  let mongodbResult = null;
  console.time('mongoose.models.User');
  try {
    console.log('mongoose.models.User :>> ', mongoose.models.User);
    mongodbResult = true;
    // 检查模型是否存在
    if (mongoose.models.User) {
      console.log('模型存在');
      // 如果模型已存在，直接使用已编译的模型
      const User = mongoose.model('User'); // 获取模型 User
      // 继续使用模型进行操作 - 通过模型查询数据
      await User.findOne().then(result => {
        console.log('result :>> ', result);
      });
    } else {
      const userSchema = new mongoose.Schema({
        name: String,
        age: Number,
        email: String,
        password: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      });

      const User = mongoose.model('User', userSchema);

      await User.findOne().then(result => {
        console.log('result :>> ', result);
      });
    }
  } catch (error) {
    console.log('error :>> ', error);
    mongodbResult = false;
  }
  console.timeEnd('mongoose.models.User');

  ctx.body = {
    errno: 0,
    data: {
      mysqlConnection: {
        message: (currentDate && 'mysql连接成功') || 'mysql连接失败',
        mysqlExecultNow,
        currentDate,
      },
      redisConnection: {
        message: (redisExecultNow && 'redis设置成功') || 'redis设置失败',
      },
      mongodbConnection: {
        message: (mongodbResult && 'mongodb连接成功') || 'mongodb连接失败',
      },
    },
  };
});

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

// 生成短信验证码
router.post('/generateSmsCode', generateValidator(phoneNumberSchema), async (ctx, next) => {
  // 1. 验证手机号是否正确 generateValidator(phoneNumberSchema)
  const { phoneNumber } = ctx.request.body;
  // 2. 发送短信验证码
  const res = await sendSmsCode(phoneNumber);
  ctx.body = res;
});

// 使用手机号登录
router.post('/login', generateValidator(phoneNumberAndSmsCodeSchema), async (ctx, next) => {
  const { phoneNumber, smsCode } = ctx.request.body;
  const res = await loginByPhoneNumber(phoneNumber, smsCode);
  ctx.body = res;
});

// 获取用户信息
router.get('/getUserInfo', loginCheck, async (ctx, next) => {
  ctx.body = new SuccessModel(ctx.userInfo);
});

// 修改用户信息
router.patch('/updateUserInfo', loginCheck, generateValidator(getUserInfoSchema), async (ctx, next) => {
  // 通过 loginCheck 之后， userInfo会被挂在到 ctx 上
  const res = await updateUserInfoController(ctx.userInfo, ctx.request.body);
  ctx.body = res;
});

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!11';
});

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
