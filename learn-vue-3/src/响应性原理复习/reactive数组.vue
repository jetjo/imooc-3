<template>
  <div class="box box-item">
    <h3>确认一下reactive([])的响应性</h3>
    <p>{{ arrayState[0] }}</p>
    <button @click="handleClick">更改数组第一项的值</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const arrayState = reactive([]);
const handleClick = () => (arrayState[0] = Math.random().toFixed(5));
</script>

<style lang="scss" scoped>
.box::first-line {
  height: 100px;
}
</style>
