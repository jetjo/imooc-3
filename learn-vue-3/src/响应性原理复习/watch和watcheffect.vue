<template>
  <div class="box-item">
    <h3>学习watch和watchEffect的区别</h3>
    <div>
      <button @click="girl.price = Math.random().toFixed(5)">
        更新girl.price
      </button>
      <button @click="girl = { oncePrice: Math.random().toFixed(5) }">
        更换女孩
      </button>
    </div>
    <p>妞妞： {{ girl }}</p>

    <p>
      <mark
        >测试发现，传递给watch的参数可以是refState、reactiveState、() => reactiveState.prop、
        ()=> refState.value、() => refState.value.prop</mark
      > <br>
      能正确监听的关键是调用执行进入watch方法时，获取的的第一个参数是响应式的，或者是一个箭头函数，并且这个箭头函数在调用时可以触发追踪。<br>
      不能像如下这样把箭头函数的执行体作为参数传递给watch，因为这样虽然触发了追踪，但不是在watch执行时触发的，是在watch调用前触发的，这个时候watchEffect还未将自己登记，没有追踪到effect，追踪无效。
      <pre>
        watch(refState.value, () => {})
      </pre>
      <ol>
        <li>被监听的对象要是响应式的，或者是响应式对象的属性</li>
        <li>watch参数是响应式对象，或者是返回响应式对象本身及其属性的箭头函数</li>
      </ol>
    </p>

        <div>
      <button @click="girlProxy.price = Math.random().toFixed(5)">
      <!-- <button @click="bak = girlProxy.price, girlProxy.price = Math.random().toFixed(5), bak.oneNight = Math.random().toFixed(5)"> -->
        更新girlProxy.price
      </button>
      <!-- <button @click="girlProxy = { oncePrice: Math.random().toFixed(5) }">
        更换女孩经纪人
      </button> -->
    </div>
    <p>妞妞1： {{ girlProxy }}</p>

    <p>
        <mark>经测试发现，watchEffect回调中访问到一个响应式对象的prop1，那么当这个响应式对象的prop2改变时不会触发watch Effect回调 <br>
        watchEffect中访问到了refState.value,如果refState.value.prop更新不会触发watchEffect回调，只有在refState.value被赋值时才触发watch Effect回调</mark>
    </p>

  </div>
</template>

<script setup>
import { watch, ref, reactive, watchEffect } from "vue";
// const girl = {
//   name: "柳如是",
//   price: {
//     once: 3000,
//     oneNight: 8000,
//   },
// };
// // [Vue warn]: Invalid watch source:  {name: '柳如是', price: {…}}
// // A watch source can only be a getter / effect function, a ref, a reactive object, or an array of these types.
// watch(girl, (curVal, preVal) =>
//   console.log(curVal, preVal, curVal === preVal, "女孩更新了")
// );

// // 如果girl不是响应式的，虽然像下面这样写没有警告，但是并不会触发watch方法
// watch(
//   () => girl,
//   (curVal, preVal) =>
//     console.log(curVal, preVal, curVal === preVal, "女孩更新了")
// );
const girl = ref({
  name: "柳如是",
  price: {
    once: 3000,
    oneNight: 8000,
  },
});
// // 即使girl是ref，向下面这样绑定也不行， 因为关键是被监听的getter在执行时并没有触发响应式状态的追踪,但是可以触发页面更新，因为模版编译成的渲染函数在获取girl值时触发了响应式追踪
// watch(
//   () => girl,
// // 测试发现如果传递给watch的第一个参数是ref,那么恰好不应写成上面的形式（() => refState）,就能在refState.value被重新赋值时触发更新
// // 如果refState.value是一个对象，要想在更新这个对象属性时也触发更新，可以设置deep为true
// watch(girl,
// // 当girl的属性被更改时不会触发，但是当girl被整体赋值时会触发，可见watch ref 时默认是浅追踪的， 因为watch的第一个参数getter在初次调用时只触发了对girl ref的value属性的追踪，并没有触发对girl ref target 属性(girl.price)的追踪
// watch(
//   () => girl.value,
// // 如果以refState.value的形式作为watch的第一个参数反而恰好是错的，因为在初始化watch为其传第一个参数时是先读取到refState.value的值，这时虽然触发了refState.value的追踪，但是因为此时还没有调用进watch，所以触发的追踪无效（没有对应的effect）。
// // 并且这时候会发生奇诡现象，即整体给girl.value赋值时不触发，而在没有给girl.value重新赋值的情形下，如果更改girl.value.price的值，会触发。
// watch(girl.value,
// // 再者，执行setup时，watch并没有触发，可见watch默认是惰性的，不会监听到初始化的赋值，
// // 但是向下面写法，girl.value.price 被监听，如果另watch是非惰性的，那么由于girl.value是undefined，那么这个watch在初始化时应该会抛出异常
// // 上一行的猜测错误，默认初始值是[]。。。因为被监听的是[() => girl.value, () => girl.value.price]
// watch(
//   [() => girl.value, () => girl.value.price],
// 分别以非惰性模式监听girl.value和girl.value.price，发现都不报错，即使girl.value初始值是undefined
watch(
  () => girl.value.price,
  (curVal, preVal) =>
    console.log(curVal, preVal, curVal === preVal, "女孩更新了"),
  { immediate: false, deep: false }
);
const girlProxy = reactive({
  name: "柳如是",
  price: {
    once: 3000,
    oneNight: 8000,
  },
});
// // OK
// watch(girlProxy,
// // 给girlProxy.price整体赋值时，不触发，因为这样写时，watch回调对应的响应式状态是reactive(girl.price),
// // girlProxy.price整体赋值后，watch回调对应的响应式状态reactive(girl.price)中的girl.price还是原来的对象
// const bak = ref(null);
// watch(girlProxy.price,
watch(() => girlProxy.price,
  (curVal, preVal) =>
    console.log(curVal, preVal, curVal === preVal, "女孩更新了"),
  { immediate: false , deep: false }
);

// 和watch相比，是非惰性的，并且对于refObject不能做到深度监听所有属性
watchEffect(() => {
    console.log(girl.value, girlProxy.name, '女孩effect');
    console.log(girl.value, girlProxy.price, '女孩effect');
})
</script>

<style lang="scss" scoped></style>
