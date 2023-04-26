// 字符串规则
const strRules = {
  type: 'string',
  maxLength: 255,
};

// 创建作品 Schema
const worksSchema = {
  type: 'object',
  required: ['title'],
  properties: {
    // WorksModel 里面的字段
    title: strRules,
    desc: strRules,
    coverImg: strRules,
    contentId: strRules,
    // 作品内容
    content: {
      type: 'object',
      // WorkContentModel 里面的字段
      properties: {
        _id: strRules,
        components: {
          type: 'array',
        },
        props: {
          type: 'object',
        },
        setting: {
          type: 'object',
        },
      },
    },
  },
};

module.exports = {
  worksSchema,
};
