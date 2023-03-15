<template>
  <div>
    <div>
      {{ state }}
    </div>
    <Child v-model="state" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './child'
const state = ref(8)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['vnode-unmounted'])
</script>

<style scoped></style>
