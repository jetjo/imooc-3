const path = require('path')

const str = 'uu77'
console.log('路径拼接：', path.join('/', 'iii/../', 'ooo', str));

console.log('../index.js的绝对路径', path.resolve('../index.js'))

console.log('./..//src/./index.js的规范化结果：', path.normalize('./..//src/./index.js'));

console.log('当前文件路径：', __dirname);

console.log('当前文件：', __filename)

console.log('../xx/xx.text的路径：（不考虑是否存在）', path.dirname('../xx/xx.text'));

module.exports = {}
