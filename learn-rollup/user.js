let name = '柳如是'
let age = 18
let money = 0

function fOneNight()
{
    this.money += 8000;
}

let girl = {
    name,
    age,
    money,
    fOneNight
}

console.log('我被导出了！');
module.exports = girl;
