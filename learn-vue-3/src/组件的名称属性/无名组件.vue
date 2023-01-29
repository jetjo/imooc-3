<template>
  <div>无名组件</div>
</template>

<script>
export default {
  mounted() {
    // debugger; // 设置断点以查看当前的上下文
    console.log("无名组件", this); // this当前组件实例
  },
};
</script>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // debugger; // 设置断点以查看当前的上下文
  console.log("无名组件1", this); // this是undefined
});

// onMounted(function () {
//   // debugger;
//   console.log("无名组件2", this); // this是undefined
// });

// //注册无效，可能window这儿有异常
// onMounted(function () {
//   // debugger;
//   console.log("无名组件3", this); // this是全局window
// }, window);

// //注册无效，应该是没有第二个参数
// onMounted(
//   function () {
//     // debugger;
//     console.log("无名组件3", this); // this是全局 {name: 'xxx'}
//   },
//   { name: "xxx" }
// );
</script>

<style lang="scss" scoped></style>
