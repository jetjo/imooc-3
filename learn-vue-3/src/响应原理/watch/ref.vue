<template>
  <div></div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";

const refBaseType = ref(0);
const refObj = ref({ name: "秋秋" });

const reactiveRef = reactive({ refBaseType, refObj });

watch(refBaseType, (v) => console.log({ refBaseType }));
watch(refBaseType.value, (v) => console.log({ refBaseType_value: v }));
watch(
  () => refBaseType,
  (v) => console.log({ "() => refBaseType": refBaseType })
);
watch(
  () => refBaseType.value,
  (v) => console.log({ "()=>refBaseType_value": v })
);

setTimeout(() => {
  refBaseType.value = parseInt(Math.random() * 100);
}, 5000);
</script>

<style lang="scss" scoped></style>
