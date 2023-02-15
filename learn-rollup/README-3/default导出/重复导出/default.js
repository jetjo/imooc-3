export default 99;
// // // export default 99;//不行，字面量不能这样重复导出
// // export
// // {
// //     default//NOTE: 报错：[!] RollupError: Duplicate export 'default'
// // }

// let num = 99;
// export default num;//NOTE: [!] RollupError: Duplicate export 'default'

export
{
    //NOTE: 再者 默认导出也不能这样写：[!] RollupError: Unexpected keyword 'default'
    // default//NOTE: [!] RollupError: Duplicate export 'default'
    // default: 999//NOTE: [!] RollupError: Unexpected token
}
