<template>
  <div>
    动态组件
    <keep-alive>
      <component :is="comName" />
    </keep-alive>
  </div>
</template>

<script setup>
import { ref } from "vue";
const comName = ref("hello-world");
</script>

<style lang="scss" scoped></style>
