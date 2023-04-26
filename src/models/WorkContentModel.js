const mongoose = require('../db/mongoose');

const workSchema = new mongoose.Schema({
  title: String, // 作品标题
  components: [Object], // 页面的组件列表
  props: Object, // 页面的属性，如页面背景图片
  setting: Object, // 配置信息，如微信分享配置
});

const Work = mongoose.model('Work', workSchema);

module.exports = { Work };
