const formidable = require('formidable');
const { UPLOAD_IMG_FAIL } = require('../../resModel/failInfo/utils');
const { SuccessModel, ErrorModel } = require('../../resModel/index');
const { uploadOSS } = require('../../vendor/uploadOSS');

/**
 * 生成唯一的文件名
 * @param {string} fileName 文件名
 * @returns {string} 唯一的文件名
 * */
function generateUniqueFilename(fileName = '') {
  if (!fileName) return '';
  // 获取当前时间戳
  const timestamp = new Date().getTime();
  // 生成一个随机字符串
  // toString() 方法是将一个数值转换成字符串的方法。在 Math.random().toString(36) 中，参数 36 表示将这个数值转换成 36 进制的字符串。因为 36 进制包含了 0-9 的数字和 a-z 的字母，所以这个方法生成的字符串是由数字和字母组成的。
  const randomString = Math.random().toString(36).slice(2, 8);

  const lastPointIndex = fileName.lastIndexOf('.');
  // 文件名没有后缀名
  if (lastPointIndex < 0) return `${fileName}-${timestamp}-${randomString}`;
  // 获取文件名的后缀
  const name = fileName.slice(0, lastPointIndex);
  const extension = fileName.split('.').pop();
  return `${name}-${timestamp}-${randomString}.${extension}`;
}

/**
 * 上传图片
 * @param {Object} req 请求对象
 * @returns {Promise} Promise 对象
 * */
async function uploadImgByFormidable(req) {
  const form = formidable({ multiples: true }); // 支持多文件上传

  return await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('err :>> ', err);
      console.log('fields :>> ', fields);
      console.log('files.....', files); // formData 其他参数，格式如如 { bbb: '123', ccc: 'abc' }


      const links = await Promise.all(
        Object.keys(files).map(name => {
          const file = files[name];
          let fileName = file.name || name;
          fileName = generateUniqueFilename(fileName); // 生成唯一的文件名

          return uploadOSS(fileName, file?.filepath);
        }),
      );

      resolve(links);
    });
  });
}

/**
 * 上传图片
 * @param {Object} req 请求对象
 * @returns {Promise} Promise 对象
 * */
async function uploadImg(req) {
  let url;
  try {
    url = await uploadImgByFormidable(req);
  } catch (error) {
    console.error('上传图片失败', error);
    // 上传图片失败
    return new ErrorModel(UPLOAD_IMG_FAIL);
  }
  return new SuccessModel(url);
}

module.exports = {
  uploadImg,
};
