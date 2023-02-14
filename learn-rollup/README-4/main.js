import * as user1 from './user'

// NOTE: 当本地的变量名和导入模块中的变量重名时
// 打包到一起时，模块中的变量名会被修改
// console.log(user1, user1.money, money);
// 下面写法，money还是在顶级上下文中
// (() => console.log(user1, user1.money, money))();

// 如果本地变量不在顶层上下文中
(() =>
{
    let money = 100;
    console.log(user1, user1.money, money);
})();

