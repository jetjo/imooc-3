(function () {
    'use strict';

    const obj = require('./命名导出.cjs');

    setTimeout(() =>
    {
        console.log(obj, '模块外...1');
        obj.num1++;
    }, 60000);

    setTimeout(() =>
    {
        console.log(obj, '模块外...2');
    }, 70000);

})();
