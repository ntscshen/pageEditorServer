const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myblog';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('blogs');

  // 1. 插入
  // const result2 = await collection.insertOne({ name: 'wangermao', age: 30 });
  // console.log('result2 :>> ', result2);
  // 2. 修改
  // const result3 = await collection.updateOne({ name: 'wangermao' }, { $set: { ageOther: 31 } });
  // console.log('result3 :>> ', result3);
  // 3. 删除
  const result4 = await collection.deleteOne({ ageOther: 31 });
  console.log('result4 :>> ', result4);
  // 4. 查询
  // const result = await collection.find({ age: 30 }).toArray(function(err, result) {


  // 查询
  // const result = await collection.find({ age: 30 }).toArray(function(err, result) {
  const result = await collection.find().toArray(function(err, result) {
    if (err) {
      console.log('err', err);
      return;
    }

    console.log('Found the following records');
    console.log(result);
    return result;
  });
  // the following code examples can be pasted here...
  console.log('result :>> ', result);
  return 'result.' + JSON.stringify(result);
}

main().then(console.log).catch(console.error).finally(() => client.close());
