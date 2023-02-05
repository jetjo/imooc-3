<template>
  <div class="box-item">
    <h3>探索refState.value是对象时的特性, 以及readonly，shallowReadonly的原理</h3>
    <div><button @click="handleClick">更改refConstObj.value</button></div>
    <div><button @click="handleClick1">更改refObj.value</button></div>
    <p>refConstObj: {{ refConstObj }}</p>
    <p>refObj: {{ refObj }}</p>
    <p>
      <mark
        >测试发现，如果refState.value是对象，那么这个对象一定是proxy类型</mark
      >
      <br> 这就是为什么如果refState.value是shallowReadonly的，向下面这样监听是合理的： <br>
      <pre>
      watch(refConstObj.value, (cur, pre) =>
        console.log(cur === pre, "watch refConstObj.value ref封装对象")
      );
      </pre>
      <mark><strong>经readonly、shallowReadonly包装后，返回一个proxy，本质上是只读的reactive，不论被包装的是ref还是普通obj,都会再在外层创建一个proxy</strong></mark>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { shallowReadonly, watch, readonly } from "vue";

// const refConstObj = ref(shallowReadonly({ name: "柳如是", age: 18 })); shallowReadonly和readonly必须放在最外层调用
const refConstObj = shallowReadonly(ref({ name: "柳如是", age: 18, body:{weight:70} }));
// 相当于：
const constObj = (reactive({ name: "柳如是", age: 18 }));
// const constObj = readonly(reactive({ name: "柳如是", age: 18 }));
// const constObj = readonly(({ name: "柳如是", age: 18 }));

const refObj = (ref({ name: "柳如是", age: 18 }));
// const refObj = readonly(ref({ name: "柳如是", age: 18 }));

onMounted(() => console.log({ refObj, refConstObj }, "ref封装对象"));

const handleClick = () => {
  //   refConstObj.value = { name: "秋秋", age: 20 };[Vue warn] Set operation on key "value" failed: target is readonly.
//   refConstObj.value.name = "秋秋";ok,可以触发watch(refConstObj.value, () => ...)的回调
    refConstObj.value.body.weight = Math.random();
  console.log({ refObj, refConstObj }, "ref封装对象");
};
const handleClick1 = () => {
  refObj.value = { name: "秋秋", age: 20 };
  console.log({ refObj, refConstObj }, "ref封装对象");
};

// // 不是深度的
// watch(() => refConstObj.value, (cur, pre) =>
//深度的
watch(refConstObj.value, (cur, pre) =>
// //不是深度的
// watch(refConstObj, (cur, pre) =>
  console.log(cur === pre, refConstObj, refObj, constObj, "watch refConstObj.value ref封装对象")
);
</script>

<style lang="scss" scoped></style>
