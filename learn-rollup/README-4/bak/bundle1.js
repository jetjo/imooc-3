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

    console.log(user1, money$1, money);

})();
