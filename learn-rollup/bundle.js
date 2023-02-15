(function () {
	'use strict';

	const user1 = require('./user');
	const user2 = require('./importor');

	let money = 1000000000000000000000000000000000;

	console.log(user1, user1.money, money);
	user1.fOneNight();
	money -= 8000;
	console.log(user1, user1.money, money);

	// const user2 = require('./user');在对之前的导出操作后再导出，可能会受之前的影响

	console.log(user2, user2.money, money);
	user2.fOneNight();
	money -= 8000;
	console.log(user2, user2.money, money);
	console.log(user1, user1.money, money);

	console.log(user1 === user2);

})();
