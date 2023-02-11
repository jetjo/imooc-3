const { MongoClient } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017';

const dbName = 'learn';

const client = new MongoClient(uri);

async function run()
{
  await client.connect();
  const db = client.db(dbName);
  await db.collection('learn').insertOne({
    name: '柳如是',
    age: 18,
    city: 'beijing',
    fuckingOneNight: 3000
  });
  await db.collection('learn').insertOne({
    name: '董小宛',
    age: 23,
    city: 'shanghai',
    fuckingOneNight: 2000
  });
  const inserted = await db.collection('learn').insertOne({
    name: '李媛媛',
    age: 20,
    city: 'beijing',
    fuckingOneNight: 2000
  });
  console.log('李媛媛：', inserted);

  const queried = await db.collection('learn').find({ city: 'beijing' }).sort({ age: -1 }).toArray();
  console.log('北京能操到：', queried);

  const updated = await db.collection('learn').updateOne({ name: '柳如是' }, { $set: { fuckingOneNight: 25110 } });
  // Update document requires atomic operators
  // const updated = await db.collection('learn').updateOne({ name: '柳如是' }, { fuckingOneNight: 25110 });
  console.log('柳如是的价格：', updated);

  const deleted = await db.collection('learn').deleteOne({ city: 'shanghai' });
  // const deleted = await db.collection('learn').deleteMany({ city: 'beijing' });
  console.warn('删掉上海的：', deleted);

}

run().catch(console.dir).finally(async _ =>
{
  await client.close();
  console.warn('数据库连接已断开');
})
