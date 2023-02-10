/* const MongoClient = require('mongodb').MongoClient;
const util = require('util');

const connect = util.promisify(MongoClient.connect);

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'learn';

const conConfig = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

/* connect(url, conConfig).then(con =>
{
    console.log('mongodb连接成功！');
    const db = con.db(dbName);

    db.close();

}).catch(err =>
{
    console.error(err);
}); /

MongoClient.connect(url, conConfig, (err, con) =>
{
    if (err)
    {
        console.error(err);
        return;
    }
    console.log('mongodb连接成功！');
    const db = con.db(dbName);

    con.close();

})
//  我草泥马，都连接不上。。。 */

const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb://127.0.0.1:27017";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run()
{
    try
    {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("learn").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally
    {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
