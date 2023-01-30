<template>
  <div>
    <div class="box-item"><directive-def-reg></directive-def-reg></div>
    <div class="box-item"><directiveHook></directiveHook></div>
    <div class="box-item"><directive-hook-args></directive-hook-args></div>
    <div class="box-item"><directiveHookArgMean /></div>
    <div class="box-item"><directiveHookElDataSet /></div>
  </div>
</template>

<script setup>
import directiveDefReg from "./指令的定义与注册.vue";
import directiveHook from "./指令钩子.vue";
import directiveHookArgs from "./指令钩子传参.vue";
import directiveHookArgMean from "./指令钩子参数们的含义.vue";
import directiveHookElDataSet from "./指令钩子间使用el.dataset传递信息.vue";
</script>

<style lang="scss" scoped>
.box-item {
  border: 3px solid gold;
  margin: 10px 0;
  :deep(h3) {
    background-color: yellow;
  }
}
</style>
