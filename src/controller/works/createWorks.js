const { v4: uuidv4 } = require('uuid');
const { ErrorModel, SuccessModel } = require('../../resModel');
const { CREATE_WORKS_FAIL } = require('../../resModel/failInfo/works');
const { createWorkService } = require('../../service/works');
/**
 * 创建作品
 * @param {string} author 作者 username
 * @param {object} data 作品数据
 * @param {object} content 作品内容（复制作品时，会传入）
 */
const createWorks = async (author, data = {}, content = {}) => {
  let title = data.title || '未命名作品';
  let desc = data.desc || '未命名作品';
  let coverImg = data.coverImg || '//typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/5f81cca3f3bf7a0e1ebaf885.png';

  const uuid = uuidv4(); // 生成唯一 id
  console.log('uuid :>> ', uuid);
  try {
    const result = createWorkService(
      {
        uuid,
        author,
        title,
        desc,
        coverImg,
      },
      content,
    );
    return result;
  } catch (error) {
    console.error('创建作品失败', error);
    return new ErrorModel(CREATE_WORKS_FAIL); // 创建作品失败 db error
  }
};
module.exports = { createWorks };




// // 修改作品信息
// router.patch('/:id', loginCheck, async ctx => {
//   const { id } = ctx.params;
//   const { username } = ctx.userInfo;

//   const res = await updateWorks(id, username, ctx.request.body);
//   ctx.body = res;
// });
