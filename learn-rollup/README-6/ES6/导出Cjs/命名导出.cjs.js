'use strict';

//NOTE: 错误写法
// const num = 99;
// export num;

//NOTE: 正确写法一
const num = 99;
//NOTE: 正确写法二
exports.num1 = 88;

setTimeout(() =>
{
    exports.num1++;
    console.log(exports.num1, '模块内...1');
}, 50000);

setTimeout(() =>
{
    console.log(exports.num1, '模块内...2');
}, 100000);

exports.num = num;
