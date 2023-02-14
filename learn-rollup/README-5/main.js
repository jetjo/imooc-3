import * as user1 from './user'

// NOTE: 在模块顶级上下文中访问未定义变量会抛出异常
console.log(user1, user1.money, money);
// 下面写法，money还是在顶级上下文中
(() => console.log(user1, user1.money, money))();

function test()
{
    // if (money)//这样判断也报错
    // if (undefined !== money)//这样判断也报错
    if (typeof money !== 'undefined')//这样判断也报错
        console.log(user1, user1.money, money);
}
// 也报错
test();

// //#region 这样写，打包时就报错：test is not exported by user.js
// user1.test = test;
// user1.test();
// //#endregion

const obj = { test };
//也报错。。。
obj.test();
