<template>
  <div>命名组件</div>
</template>

<script>
export default {
  name: "nameInOptions", // 这个name不会成为this.name，而是this.$.type.name
  mounted() {
    // debugger; // 设置断点以查看当前的上下文
    console.log("命名组件", this); // this是当前组件实例
    console.log("命名组件😑", this.$.type.name);
  },
};
</script>

<script setup name="nameInSetup">
//script setup>
import { onMounted } from "vue";

onMounted(() => {
  // debugger; // 设置断点以查看当前的上下文
  console.log("命名组件", this); // this是undefined
});
</script>

<style lang="scss" scoped></style>
