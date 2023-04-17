<template>
  <div></div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";

// const refBaseType = ref(0);
const refObj = ref({ name: "秋秋" });

// const reactiveRef = reactive({ refBaseType, refObj });

watch(refObj, (v) => console.log({ refObj }));
watch(refObj.value, (v) => console.log({ refObj_value: v }));
watch(
  () => refObj,
  (v) => console.log({ "() => refObj": refObj })
);
watch(
  () => refObj.value,
  (v) => console.log({ "()=>refObj_value": v })
);
watch(
  () => refObj.value.name,
  (v) => console.log({ "()=>refObj_value_name": v })
);

// setTimeout(() => {
//   refObj.value.name = "芳芳";
// }, 5000);
setTimeout(() => {
  refObj.value = 0;
}, 7000);
</script>

<style lang="scss" scoped></style>
