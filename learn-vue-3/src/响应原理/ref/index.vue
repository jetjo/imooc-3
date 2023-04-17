<template>
  <div></div>
</template>

<script setup>
import { ref, shallowRef, watch } from "vue";
const refObj = ref({ name: "秋秋" });
const shallowRefObj = shallowRef({ name: "秋秋" });
watch(refObj.value, (v) => console.log({ refObj_value: v }));
watch(shallowRefObj.value, (v) => console.log({ shallowRefObj_value: v }));
setTimeout(() => {
  refObj.value.name = "芳芳";
  shallowRefObj.value.name = "芳芳";
  console.log({ refObj, shallowRefObj });
}, 10000);
</script>

<style lang="scss" scoped></style>
