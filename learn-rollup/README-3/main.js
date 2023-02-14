// NOTE: 没有默认导出，这样写打包报错，[!] RollupError: "default" is not exported by "user.js", imported by "main.js".
// 打包命令：rollup main.js --file bundle.js --format iife
// 应该为：import * as user1 from './user'
import user1 from './user'

console.log(user1)

