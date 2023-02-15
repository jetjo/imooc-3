// let count = 0
// let age = 18
// const money = 9
let grade = 5

console.log('ES6模块被导出了', '用于测试导出次数');

// export default let count = 0;//不能加let, 不能和default同时出现
// export default const count = 0;//不能加const, 不能和default同时出现
//  default count = 99;//不行
// export default count = 99;

// export  age = 18;//不行，必须加default、let、const其中之一
// export let age = 18;//可以
export const age = 18;//可以

// export money;// 不行
// export default money;//可以，可以提前以let、const关键字声明并初始化，即使不提前初始化也可以
// export default money = 0;//可以即使已经提前以const声明并初始化

export default 99//甚至可以直接导出字面量，则在本模块内部因为匿名，所以无法读写

// default++//不行

export
{
    default,
    age,
    money,
    grade
}
