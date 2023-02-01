<template>
  <teleport to="body">
    <div v-if="show" @transitionend="transitionEndHandler" :style="{ opacity }">
      <!-- <div ref="maskRef" v-show="show" @transitionend="transitionEndHandler"> -->
      {{ data }}
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";
const data = ref("hello world!");
const show = ref(true);
// const maskRef = ref(null);
const opacity = ref(0.7);
function transitionEndHandler() {
  //   maskRef.value.style.display = "none";
  show.value = false;
}
onMounted(() => {
  //   maskRef.value.style.opacity = 0;
  //   opacity.value = 0;//直接写在这里，opacity一开始就是0了
  setTimeout(() => {
    opacity.value = 0;
  }, 0);
});
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  color: #fff;
  //   opacity: 0.7;
  font-size: 2rem;
  transition: opacity 3s ease-out 0s;
  text-align: center !important;
  line-height: 100vh;
}
</style>
