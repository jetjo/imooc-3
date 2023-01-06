// TODO: MVVM框架中的View的一部分
<template>
  <div></div>
  <HelloWorld msg="Vite + Vue" />
</template>

// TODO: MVVM框架中的Model
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { ref, reactive } from "vue";
const age = ref(18);
const person = reactive({
  name: "柳如是",
  height: 180,
  weight: 80,
});
</script>

// TODO: MVVM框架中的View另一部分, 那么MVVM框架中的VM在哪？？？
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
