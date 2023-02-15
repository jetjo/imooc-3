(function () {
    'use strict';

    var count = 99;

    var obj = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get default () { return count; }
    });

    console.log(obj, count);
    count++;//NOTE: default是一个getter， 编译时会报错：(!) Illegal reassignment of import "obj" in "main.js".
    //NOTE: 但是编译输出是count++
    console.log(obj, count);

})();
