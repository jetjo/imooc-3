const fs = require('fs');
const util = require('util')

//readFile和readFileSync不适合大文件读取，因为会将文件完全载人内存，而不是使用流
const readFile = util.promisify(fs.readFile);

const file = './test.t0xt';
readFile(file, 'utf-8').then(content =>
{
  console.log(`${ file }的内容：`, content);
}).catch(err =>
{
  console.error(err);
})

const writeFile = util.promisify(fs.writeFile);
writeFile(file, '一些内容...', { flag: 'a+' }).then(_ =>
{
  console.log('写入成功！');
}).catch(err =>
{
  console.error(err);
});

const appendFile = util.promisify(fs.appendFile)

appendFile(file, '一些内容...').then(_ =>
{
  console.log('追加成功！！！');
}).catch(err =>
{
  console.error(err);
});

module.exports = {}
