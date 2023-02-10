const utils = require('util');
const fs = require('fs');

const open = utils.promisify(fs.open);
const close = utils.promisify(fs.close);

let fd = null;
open('./学习访问文件系统/test.txt', 'r').then(_fd =>
{
    console.log(_fd, '...');
    fd = _fd;
}).catch(err =>
{
    console.error(err, 'err');

}).finally(() =>
{
    fd && close(fd);
});


const stat = utils.promisify(fs.stat);
stat('./学习访问文件系统/test.txt').then(stats =>
{
    console.log('是目录吗？', stats.isDirectory());
    console.log('是文件吗？', stats.isFile());
    console.log('是快捷方式吗？', stats.isSymbolicLink());
    console.log('文件信息：', stats);
}).catch(err =>
{
    console.error(err, 'err');
});

module.exports = {}
