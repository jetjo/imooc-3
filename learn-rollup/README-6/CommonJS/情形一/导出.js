
const num = 99;
let num1 = 88;

setTimeout(() =>
{
    num1++
    console.log(num1, '模块中...1');
}, 50000);

setTimeout(() =>
{
    console.log(num1, '模块中...2');
}, 100000);

module.exports = { num1, num };

