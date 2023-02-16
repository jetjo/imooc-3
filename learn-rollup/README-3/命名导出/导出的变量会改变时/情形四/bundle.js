(function () {
    'use strict';

    //NOTE: 错误写法
    // const num = 99;
    // export num;

    //NOTE: 正确写法一
    const num = 99;
    //NOTE: 正确写法二
    let num1 = 88;

    setTimeout(() =>
    {
        num1++;
    }, 50000);

    var user1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        num: num,
        get num1 () { return num1; }
    });

    // NOTE: 没有默认导出，这样写打包报错，[!] RollupError: "default" is not exported by "命名导出.js", imported by "main.js".


    console.log(user1, num, num1);

    setTimeout(() =>
    {
        console.log(user1, num, num1);
    }, 60000);

})();
