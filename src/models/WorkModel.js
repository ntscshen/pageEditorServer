const mongoose = require('../db/mongoose');

const workSchema = new mongoose.Schema({
  title: String,
  components: [Object],
  props: object,
  setting: object,
});

const Work = mongoose.model('Work', workSchema);

module.exports = { Work };
