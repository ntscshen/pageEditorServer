const path = require('path');
const OSS = require('ali-oss');
const { createReadStream } = require('fs');
const { OSSConfig } = require('../config/dev');

// 初始化
const client = new OSS({
  ...OSSConfig,
  // // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  // region: 'oss-cn-hangzhou',
  // // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  // accessKeyId: 'XXX',
  // accessKeySecret: 'YYY',
  // // 填写Bucket名称。
  // bucket: 'low-code-bucket',
});

async function put() {
  try {
    // 1. 上传文件
    // const result = await client.put('1.png', path.normalize('/Users/ntscshen/Code/images/1.png'));
    // 2. 上传文件到指定目录
    // const result = await client.put('image/2.png', path.normalize('/Users/ntscshen/Code/images/2.png'));
    // 3. 流式上传
    const stream = createReadStream(path.normalize('/Users/ntscshen/Code/images/3.png'));
    console.log('object :>> ', path.normalize('/Users/ntscshen/Code/images/3.png'));
    const result = await client.putStream('image/23.png', stream);
    // /Users/ntscshen/Code/images
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
// put();

// 文件上传到OSS
async function uploadOSS(fileName, filePath) {
  const stream = createReadStream(path.normalize(String(filePath)));
  // OSS文件夹
  const foloder = 'h5/test';
  try {
    const result = await client.putStream(`${foloder}/${fileName}`, stream);
    console.log('result :>> ', result);
    return result.url;
  } catch (e) {
    console.log('e :>> ', e);
    return new Error('aliyunOSS upload failed');
  }
}

module.exports = {
  uploadOSS,
};
