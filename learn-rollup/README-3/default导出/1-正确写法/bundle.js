(function () {
	'use strict';

	var count = 99;

	var obj = /*#__PURE__*/Object.freeze({
		__proto__: null,
		get default () { return count; }
	});

	console.log(obj, count);
	count++;
	console.log(obj, count);

})();
