<template>
  <div v-learn-directive:foo.bar="state">
    <button @click="fuckingOneNight">fucking me!!!</button>{{ bg.fuckingCount }}
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, inject } from "vue";
const instance = getCurrentInstance();
const proxy = instance.proxy;
const state = ref(0);
proxy.$pluginLearn();
const injectData = inject("aInjectedData");
const aCommonInjectData = inject("aCommonInjectData");
const { bg, fuckingOneNight } = injectData;
</script>

<style lang="scss" scoped></style>
