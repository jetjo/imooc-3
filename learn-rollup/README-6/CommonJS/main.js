const user1 = require('./user');

let money = 1000000000000000000000000000000000;

console.log(user1, user1.money, money)
user1.fOneNight();
money -= 8000;
console.log(user1, user1.money, money)

const user2 = require('./user');

console.log(user2, user2.money, money)
user2.fOneNight();
money -= 8000;
console.log(user2, user2.money, money)
