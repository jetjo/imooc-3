<template>
  <div></div>
</template>

<script setup>
import { ref, readonly } from "vue";
const refBaseType = ref(0);
const readonlyBaseTypeRef = readonly(refBaseType);
setTimeout(() => {
  console.log({ refBaseType, readonlyBaseTypeRef });
  console.log(readonlyBaseTypeRef.value);
  //   readonlyBaseTypeRef.value = Math.random();
  refBaseType.value = Math.random();
  console.log(readonlyBaseTypeRef.value);
}, 5000);
</script>

<style lang="scss" scoped></style>
