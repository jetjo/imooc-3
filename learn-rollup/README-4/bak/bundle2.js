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

    // NOTE: 当本地的变量名和导入模块中的变量重名时
    // 打包到一起时，模块中的变量名会被修改
    // console.log(user1, user1.money, money);
    // 下面写法，money还是在顶级上下文中
    (() => console.log(user1, money$1, money))();

})();
