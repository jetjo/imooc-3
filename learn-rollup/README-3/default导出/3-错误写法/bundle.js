(function () {
	'use strict';

	// const num;//必须同时初始化
	// let num;//
	// var num = 88;//
	// var num;//
	//NOTE: 和上面的num不是一回事，编译输出中没有了
	//NOTE: 如果default 后面导出的东西有一个名称(比如num)，那相当于重新以var num = ...的形式重新声明并导出了
	var count = 99;

	var obj = /*#__PURE__*/Object.freeze({
		__proto__: null,
		get default () { return count; }
	});

	console.log(obj, count);
	count++;
	console.log(obj, count);

})();
