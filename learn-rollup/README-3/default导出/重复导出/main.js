import * as obj from './default'
import count from './default'
console.log(obj, count);
obj.default++;//NOTE: default是一个getter， 编译时会报错：(!) Illegal reassignment of import "obj" in "main.js".
//NOTE: 但是编译输出是count++
console.log(obj, count);
