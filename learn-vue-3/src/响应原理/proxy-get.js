const target = {
  // name: '香香'
  _name: '香香~'
}
Object.defineProperty(target, 'name', {
  // get: (function () { return () => this.name }).call({ name: '秋秋' })
  // get: (function () { return this.name }).bind({ name: '秋秋' })
  // get: function () { return this.name }// 没有receiver的情况下，死循环了！！！
  get: function () { console.log('this: ', this); return this._name }
});

const proxy = new Proxy(target, {
  get(target, propName, receiver)
  {
    console.log('拦截', target, receiver, propName);//使用proxy.propName这种常规方式调用，receiver就是proxy
    console.log(receiver === proxy);
    console.log(receiver === target);
    // return Reflect.get(receiver, propName);
    return Reflect.get(...arguments);
    // NOTE: 返回undefined，为啥，因为没加return。。。
    // Reflect.get(target, propName, receiver);
    // return receiver && receiver !== proxy ? receiver[propName] : target[propName]// 违背本意
    // return (receiver || target)[propName]// 违背本意
    // return receiver[propName]//如果receiver是proxy，则死循环！！！
  }
});

// const name = proxy.name;
// const name = Reflect.get(proxy, 'name');
// 这一句只会被拦截一次，第一次不会被拦截，因为name是个getter，Reflect.get第一个参数是target，直接调用的target的getter，所以第一次不会被拦截，
// 但是因为第三个参数是proxy，所以执行target.name的getter时，其内部的this是proxy,所以第二次是调用的proxy的getter，所以第二次会被拦截到
// 如果_name不是个getter，那么就不会发生第三次拦截了
// NOTE: 牢记，Reflect.get的第三个参数的意思是：如果Reflect.get的第一个参数被访问到的成员（Reflect.get的第二个参数指定）是getter,
// NOTE: 那么这个getter中的this是Reflect.get的第三个参数
const name = Reflect.get(target, 'name', proxy);
// const name = Reflect.get(proxy, 'name', { name: '芳芳' });
// const name = Reflect.get(target, 'name', { _name: '芳~芳~' });
// const name = Reflect.get(target, 'name');

console.log({ name });
