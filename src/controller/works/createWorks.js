const { v4: uuidv4 } = require('uuid');
const { ErrorModel, SuccessModel } = require('../../resModel');
const { WORK_NOT_EXIST, CREATE_WORKS_FAIL, FORCE_OFFLINE } = require('../../resModel/failInfo/works');
const { createWorkService, findOneWorkService, updateWorksService } = require('../../service/works');

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

/**
 * 1. 查询作品信息，通过作品 id
 * 2. 判断作品是否存在， 判断作品状态是否为强制下线状态
 * 3. 复制作品( 调用createWorks 方法 )，新的信息需要通过 WorkSchema 校验规则
 * 4. 更新原有项目的复制次数
 * 5. 返回新的作品信息
 * @param {string} id 作品 id
 * @param {string} author 作者 username
 * @returns {object} result
 * */
async function copyWorks(id, author) {
  // 容错处理
  const workInfo = await findOneWorkService({ id });
  if (!workInfo) return new ErrorModel(WORK_NOT_EXIST);
  if (parseInt(workInfo.status, 10) === 3) return new ErrorModel(FORCE_OFFLINE);

  // 创建新项目
  const newData = {
    title: `${workInfo.title}-复制`,
    desc: workInfo.desc,
    coverImg: workInfo.coverImg,
  };
  const result = await createWorks(author, newData, workInfo.content);

  // 更新原有项目的复制次数
  await updateWorksService({ id }, { copiedCount: workInfo.copiedCount + 1 });

  return result;
}

module.exports = { createWorks, copyWorks };
