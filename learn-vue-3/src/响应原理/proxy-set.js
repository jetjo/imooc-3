const target = {
  name: '香香',
  _name: '香香'
}

const receiver = { name: '秋秋' }

Object.defineProperty(target, 'name', {
  set: (function () { return (v) => this.name = v }).call(receiver)
  // set: function (v) { this._name = v }
  // set: function (v) { this.name = v }// 没有receiver的情况下，死循环了！！！
  // set: (function (v) { this.name = v }).bind(receiver)
});

const proxy = new Proxy(target, {
  set(target, propName, value, receiver)
  {
    console.log('拦截', target, receiver, propName, value);
    (receiver || target)[propName] = value// 违背本意，也不能这么说，这样做，即使set绑定了this,也无效了
    // Reflect.set(target, propName, value, receiver);
    // Reflect.set(...arguments);
    // receiver[propName]//如果receiver是proxy，则死循环！！！
  }
});

const receiver1 = { name: '芳芳' };

console.log({ receiver, receiver1 });

Reflect.set(proxy, 'name', '婊子', receiver1);
// proxy.name = '婊子';

console.log({ receiver, receiver1, target }, proxy.name, target.name);
