(function () {
	'use strict';

	// const num;//必须同时初始化
	const num = 88;// NOTE: 配合第10行的导出方式，导出一个常量

	var obj = /*#__PURE__*/Object.freeze({
		__proto__: null,
		get default () { return num; }
	});

	console.log(obj, num);
	num++;
	console.log(obj, num);

})();
