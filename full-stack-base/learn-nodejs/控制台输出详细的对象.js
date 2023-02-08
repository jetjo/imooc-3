const obj = {
  name: 'joe',
  age: 35,
  person1: {
    name: 'Tony',
    age: 50,
    person2: {
      name: 'Albert',
      age: 21,
      person3: {
        name: 'Peter',
        age: 23
      }
    }
  }
}
console.log('默认输出：', obj);
console.log('详细对象：', JSON.stringify(obj, null, 2));//缩进两个空格
