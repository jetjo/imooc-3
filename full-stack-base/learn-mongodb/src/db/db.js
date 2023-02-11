// schema.js
const mongoose = require('mongoose')

// 6.0版本以后的mongoose不用设置
// mongoose.set('useCreateIndex', true)
// mongoose.set('useFindAndModify', true)

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'learn';

(async () =>
{
  const con = await mongoose.connect(`${ uri }/${ dbName }`, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('数据库连接成功：', con === mongoose);
})().catch(console.dir);

module.exports = mongoose;
