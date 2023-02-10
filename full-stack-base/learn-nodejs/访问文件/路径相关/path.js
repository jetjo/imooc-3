const path = require('path');

// 从路径中获取信息
const pathStr = __dirname; //__filename; //'./学习访问文件系统/path.js';
console.log('当前文件名', __filename);
console.log('当前文件所在目录', __dirname);
console.log('路径：', pathStr);
console.log('父文件夹：', path.dirname(pathStr));
console.log('文件名：', path.basename(pathStr));
console.log('扩展名', path.extname(pathStr));
console.log('不带扩展名的文件名：', path.basename(pathStr, path.extname(pathStr)));


module.exports = {}
