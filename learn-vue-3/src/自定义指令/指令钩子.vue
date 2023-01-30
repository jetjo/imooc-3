<template>
  <h3>指令钩子执行时刻、常用钩子使用</h3>
  <!-- {{ state }}此处的状态更新就可以引起自定义指令的钩子更新 -->
  <!-- <button v-learn-directive-hook:bar.foo.fuck="state" @click="triggerUpdate"> -->
  <button v-learn-directive-hook:bar.foo.fuck="'value'" @click="triggerUpdate">
    探索什么条件可以触发自定义指令的update相关的钩子
  </button>
  {{ state }}此处的状态更新也可以引起自定义指令的钩子更新
  <figure>
    <figcaption>常用的指令钩子</figcaption>
    <pre>
    function handler() {}// 指令的mounted、updated钩子所执行的业务逻辑往往是一致的
  export const vLearnDirectiveHook = {
    <mark>// 类似于子组件的mounted，会在所在组件的mounted钩子前执行,理解指令钩子与所在组件钩子的调用先后问题，可以把指令当作普通组件理解</mark>
    mounted(el, binding, vNode, vPreNode)
    {
        handler()
    },
    <mark>// 经测试，只要被改变的状态直接或间接绑定到了模板上，这个钩子就会在所在组件的updated钩子之前调用</mark>
    updated(el, binding, vNode, vPreNode)
    {
        handler()
    }
    <br>// 只有mounted、updated钩子的指令全局注册时可以简写如下：
    app.directive("LearnDirectiveHook", (el, binding) => handler());// the 'handler' method will be called for both `mounted` and `updated`
}
</pre>
  </figure>
</template>

<script setup>
import { vLearnDirectiveHook } from "./指令钩子";
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
} from "vue";
onBeforeMount(() =>
  console.log("directive~ 使用自定义指令的元素所在的组件的onBeforeMount钩子")
);
onMounted(() =>
  console.log("directive~ 使用自定义指令的元素所在的组件的onMounted钩子")
);
onBeforeUpdate(() =>
  console.log("directive~ 使用自定义指令的元素所在的组件的onBeforeUpdate钩子")
);
onUpdated(() =>
  console.log("directive~ 使用自定义指令的元素所在的组件的onUpdated钩子")
);
onBeforeUnmount(() =>
  console.log("directive~ 使用自定义指令的元素所在的组件的onBeforeUnmount钩子")
);
onUnmounted(() =>
  console.log("directive~ 使用自定义指令的元素所在的组件的onUnmounted钩子")
);
const state = ref(0);
function triggerUpdate() {
  state.value = Math.random();
}
</script>

<style lang="scss" scoped></style>
