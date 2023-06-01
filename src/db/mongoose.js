// 进行数据库的连接
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { mongodbConfig } = require('../config/dev');

console.log('`${mongodbConfig.url}/${mongodbConfig.dbName}` :>> ', `${mongodbConfig.url}/${mongodbConfig.dbName}`);

mongoose.connect(`${mongodbConfig.url}/${mongodbConfig.dbName}`).then(() => console.log('Connected to MongoDB...')).catch(err => console.error('Could not connect to MongoDB...', err));

// 连接对象
// const db = mongoose.connection;

module.exports = mongoose;


// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
//   password: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model('User', userSchema);

// User.findOne().then(result => {
//   console.log('result :>> ', result);
// });

// 1. 创建
// User.create({ name: 'zhansan', age: 22 })

// 2. 查找
// User.find({
//   name: /s/, // 正则 /s/ 匹配所有包含s的
// })
//   .sort({ _id: 1 }) // -1 降序， 1 升序
//   .then(result => {
//     console.log('result :>> ', result); // 多个对象形式(数组)
//   })
//   .catch(err => {
//     console.log('err :>> ', err);
//   });

// 3. 查看单个博客的数据 通过id
// User.findById('64424aabe546f9c6ddb8b6e8')
//   .then(result => {
//     console.log('result id :>> ', result); // 单个对象形式
//   })
//   .catch(err => {
//     console.log('err :>> ', err);
//   });

// 4. 修改 通过id
// User.findOneAndUpdate
// User.findByIdAndUpdate(
//   '64424aabe546f9c6ddb8b6e8',
//   { age: '1287', name: '1234567890' },
//   {
//     new: true, // 默认false，返回修改前的数据，true 返回修改后的数据
//   },
// )
//   .then(result => {
//     console.log('result id :>> ', result); // 单个对象形式
//   })
//   .catch(err => {
//     console.log('err :>> ', err);
//   });

// 5. 删除 通过id
// User.findOneAndDelete({ _id: '644253b1725deb436084f401', name: 'zhansan', age: 22 })
//   .then(result => {
//     console.log('result id :>> ', result); // 单个对象形式
//   })
//   .catch(err => {
//     console.log('err :>> ', err);
//   });

// const userTest = new User({ name: 'ntscshen999123', age: 99 });
// console.log('userTest :>> ', userTest);

// userTest.save().then((err, result) => {
//   console.log('userTest saved.')
//   console.log('err :>> ', err);
//   console.log('result :>> ', result);
// });
