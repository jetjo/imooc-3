(function () {
    'use strict';

    const obj = require('./导出');

    setTimeout(() =>
    {
        console.log(obj, '模块外...1');
        obj.num1 += 10;
        obj.num += 10;
    }, 60000);

    setTimeout(() =>
    {
        console.log(obj, '模块外...2');
    }, 70000);

})();
