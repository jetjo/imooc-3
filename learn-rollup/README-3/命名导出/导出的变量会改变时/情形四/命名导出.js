//NOTE: 错误写法
// const num = 99;
// export num;

//NOTE: 正确写法一
export const num = 99;
//NOTE: 正确写法二
let num1 = 88;

setTimeout(() =>
{
    num1++
}, 50000);
export { num1 }
