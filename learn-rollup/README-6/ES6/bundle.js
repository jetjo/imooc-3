(function () {
    'use strict';

    let name = '柳如是';
    let age = 18;
    let money$1 = 0;

    function fOneNight()
    {
        money$1 += 8000;
    }

    var user2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        age: age,
        fOneNight: fOneNight,
        get money () { return money$1; },
        name: name
    });

    let money = 1000000000000000000000000000000000;

    console.log(user2, money$1, money);
    fOneNight();
    money -= 8000;
    console.log(user2, money$1, money);

    console.log(user2, money$1, money);
    fOneNight();
    money -= 8000;
    console.log(user2, money$1, money);

})();
