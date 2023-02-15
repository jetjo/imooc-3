// const num;//必须同时初始化
// const num = 88;//
let num = 88;//
// let num;//
// var num = 88;//
// var num;//
//NOTE: 和上面的num不是一回事，编译输出中没有了
//NOTE: 如果default 后面导出的东西有一个名称(比如num)，那相当于重新以var num = ...的形式重新声明并导出了
export default num = 99;
