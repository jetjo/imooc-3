const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017';

const mongoClient = new MongoClient(uri, { monitorCommands: true });

// mongoClient.on('commandStarted', started => console.log(started));
mongoClient.on('commandFailed', failed => console.error(failed))
// mongoClient.on('commandSucceeded', succeed => console.log(succeed))

async function run()
{
  try
  {
    await mongoClient.connect();

    //先创建一个使用此连接的的数据库实例Db，然后调用这个Db实例的command异步方法执行测试命令
    const db = mongoClient.db('learn');
    await db.command({ ping: 1 })

    //db()方法参数默认是test数据库。。。
    // await mongoClient.db().collection('learn').insertOne({ name: 'spot', kind: 'dog' });
    await db.collection('learn').insertOne({ name: 'spot', kind: 'dog' });

    console.log('成功连接到了数据库！');
  } catch (error)
  {
    console.error(error);
  } finally
  {
    await mongoClient.close();
  }
}

run().catch(console.dir);
