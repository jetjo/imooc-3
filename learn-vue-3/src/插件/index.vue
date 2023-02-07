<template>
  <div v-learn-directive:foo.bar="state">
    <button @click="fuckingOneNight">fucking me!!!</button>{{ bg.fuckingCount }}
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, inject } from "vue";
const instance = getCurrentInstance();
const proxy = instance.proxy;
console.log(
  instance,
  instance.proxy,
  "查看getCurrentInstance方法返回值的proxy属性, 学习插件"
);
const state = ref(0);
proxy.$pluginLearn();
const injectData = inject("aInjectedData");
const aCommonInjectData = inject("aCommonInjectData");
console.log(injectData, "学习在插件中注入数据injectReactiveData");
console.log(aCommonInjectData, "学习在插件中注入数据injectCommonData");
const { bg, fuckingOneNight } = injectData;
</script>

<style lang="scss" scoped></style>
