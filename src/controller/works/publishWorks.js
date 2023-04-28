const { SuccessModel, ErrorModel } = require('../../resModel/index');
const { PUBLISH_WORKS_FAIL, FORCE_OFFLINE_FAIL, PUBLISH_WORKS_DB_ERROR_FAIL } = require('../../resModel/failInfo/works');
const { findOneWorkService, updatePublishService, updateWorksService } = require('../../service/works');

/**
 * @description 发布作品
 * @param {number} id 作品id
 * @param {string} author 作者
 * @param {boolean} isTemplate 是否为模板
 * @returns {object} 发布结果
 * */
async function publishWorks(id, author, isTemplate = false) {
  console.log('[id] :>> ', [id]);
  console.log('author :>> ', author);

  // 1. 查询单个作品
  const work = await findOneWorkService({ id, author });
  console.log('work :>> ', work);
  if (work === null) return new ErrorModel(PUBLISH_WORKS_FAIL);

  // 2. 判断作品是否被强制下线了
  if (parseInt(work.status, 10) === 3) return new ErrorModel(FORCE_OFFLINE_FAIL);
  console.log('work :>> ', work);

  let result;
  try {
    // 3. 发布作品( 将work内容部分，重新创建一张mongodb表，内容同 传进来的component一致 )
    const publishContentId = await updatePublishService(work.publishContentId, work.content);

    // 4. 更新作品(新创建的表)状态
    let updateWork = {
      status: 2,
      lastestPublishTime: new Date(),
    };
    if (isTemplate) {
      updateWork = {
        ...updateWork,
        isTemplate: true,
      };
    }
    console.log('{11111} :>> ', {
      publishContentId,
      ...updateWork,
    });

    result = await updateWorksService(
      {
        id,
        author,
      },
      {
        publishContentId,
        ...updateWork,
      },
    );
  } catch (error) {
    console.error('error :>> ', error);
    return new ErrorModel(PUBLISH_WORKS_DB_ERROR_FAIL);
  }

  console.log('result :>> ', result);
  // 发布作品失败
  if (result === null) return new ErrorModel(PUBLISH_WORKS_FAIL);

  const origin = `://h5.www.ntscshen.top`;
  const url = `${origin}/p/${work.id}-${work.uuid}`;
  // 发布作品成功
  return new SuccessModel(url);
}

module.exports = {
  publishWorks,
};

/**
 * 默认状态下， 作品Model中 publishContentId 为 null
 * 当触发发布操作时， 将重新创建一张mongodb表，内容同 传进来的component一致
 * 创建成功之后，将表内容进行更新
 * status: 2,
 * latestPublishAt: new Date(),
 *
 * */
