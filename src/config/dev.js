// AKSK 配置
const AKSKConfig = {
  accessKeyId: 'xxxx',
  accessKeySecret: 'yyyy',
};
module.exports = {
  // mysql 配置
  mysqlConfig: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'aB123456',
    database: 'editor_server_mysql_db',
  },
  //mongodb 配置
  mongodbConfig: {
    url: 'mongodb://localhost:27017',
    dbName: 'editor_server_mongo_db',
  },
  // redis 配置
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
  },
  // cors 跨域配置
  corsOrigin: '*',
  // jwt 过期时间
  jwtExpire: 60 * 60 * 24 * 1, // 1天
  // sms 配置
  smsConfig: {
    SignName: 'lowCode', //短信签名名称
    TemplateCode: 'SMS_460725207', //短信模板CODE
  },
  AKSKConfig,
  // OSS 配置
  OSSConfig: {
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-hangzhou',
    // 填写Bucket名称。
    bucket: 'low-code-bucket',
    ...AKSKConfig,
  },
};
