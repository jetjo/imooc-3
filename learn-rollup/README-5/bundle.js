(function () {
    'use strict';

    let name = '柳如是';
    let age = 18;
    let money$1 = 0;

    function fOneNight()
    {
        money$1 += 8000;
    }

    var user1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        age: age,
        fOneNight: fOneNight,
        get money () { return money$1; },
        name: name
    });

    // NOTE: 在模块顶级上下文中访问未定义变量会抛出异常
    console.log(user1, money$1, money);
    // 下面写法，money还是在顶级上下文中
    (() => console.log(user1, money$1, money))();

    function test()
    {
        // if (money)//这样判断也报错
        // if (undefined !== money)//这样判断也报错
        if (typeof money !== 'undefined')//这样判断也报错
            console.log(user1, money$1, money);
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

})();
