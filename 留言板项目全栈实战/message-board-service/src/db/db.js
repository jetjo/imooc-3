const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const uri = 'mongodb://127.0.0.1:27017';

const dbName = 'MessageBoard';

!(
  async () =>
  {
    const con = await mongoose.connect(`${ uri }/${ dbName }`);
    // console.log(`成功连接到数据库：${ uri }`);
  }
)().catch(console.dir)

module.exports = mongoose;
