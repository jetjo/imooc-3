const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'learn';

(async () =>
{
  await mongoose.connect(`${ uri }/${ dbName }`)
  console.log('数据库连接成功！');
})().catch(console.dir);

module.exports = mongoose;
