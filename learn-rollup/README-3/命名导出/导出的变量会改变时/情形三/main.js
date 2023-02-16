// NOTE: 没有默认导出，这样写打包报错，[!] RollupError: "default" is not exported by "命名导出.js", imported by "main.js".
// import user1 from './命名导出'
// 打包命令：rollup main.js --file bundle.js --format iife
//NOTE: 应该为：
import * as user1 from './命名导出'
//NOTE: 或者
import { num, num1 } from './命名导出'


console.log(user1, num, num1)
user1.num++;
console.log(user1, num, num1)

