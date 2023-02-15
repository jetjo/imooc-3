// export default 要么像如下一样直接导出字面量：(根据测试1)
// export default 1000

// 要么导出一个已经声明并赋过值的量：(根据测试4)
// var xxx = 0;//let 、const 也可以
// export default xxx;

// 但是不能在使用默认导出导出一个量时，再给这个量赋值：(根据测试3)
// 因为根据3的测试，再在导出时重新赋值，相当于重新声明了一个变量
// var xxx = 0;
// export default xxx = 999;

// 但是如果向下面这样直接导出，而没有提前声明过，则会错误的导出一个未声明的变量：(根据测试2)
export default yyy = 999;
