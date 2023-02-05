<template>
  <div class="box-item">
    <h3>学习如何保证注入的响应式状态对于子组件只读，以保持数据流的单向性</h3>
    <div>
      <p>refVar: {{ refVar }}</p>
      <p>refConstObj: {{ refConstObj }}</p>
      <p>refObj: {{ refObj }}</p>
      <p>proxyState: {{ proxyState }}</p>
    </div>
    <injectReadonly></injectReadonly>
  </div>
</template>

<script setup>
import { provide, reactive, ref, readonly, shallowReadonly } from "vue";
import injectReadonly from "./inject只读式响应数据.vue";
const refVar = ref(0);
const refConstObj = shallowReadonly(ref({ name: "柳如是" }));
const refObj = ref({ name: "柳如是" });
const proxyState = reactive({ age: 18 });
const changeAge = () => (proxyState.age = Math.random());
const changeVar = () => (refVar.value = Math.random());
const changeName = (name = "秋秋") => (refConstObj.value.name = name);
const changeGirl = (name = "秋秋") => (refObj.value = { name });
provide(
  "girls",
  readonly({
    refVar,
    refConstObj, //使用readonly包裹后注入到子组件里仍然是可写的，所以ref({})不适合注入
    refObj, //使用readonly包裹后注入到子组件里仍然是可写的，所以ref({})不适合注入
    proxyState,
    changeAge,
    changeGirl,
    changeName,
    changeVar,
  })
);
</script>

<style lang="scss" scoped></style>
