<template>
  <div></div>
</template>

<script setup>
import { ref, readonly } from "vue";
const refObj = ref({ age: 0 });
const readonlyObjRef = readonly(refObj);
setTimeout(() => {
  console.log({ refObj, readonlyObjRef });
  console.log(readonlyObjRef.value.age);
  //   readonlyObjRef.value.age = Math.random();
  refObj.value.age = Math.random();
  console.log(readonlyObjRef.value.age);
}, 5000);
</script>

<style lang="scss" scoped></style>
