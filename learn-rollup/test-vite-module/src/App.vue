<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";
import Component1 from "./component-1";
import Component2 from "./component-2";
const t = ref(0);
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->

  <Component1 :t="t" />
  <Component2 :t="t" />
  <Component1 :t="t" />
  <!-- <Component2 :t="t" /> -->
  <button @click="() => (t = Math.random())">刷新页面</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
