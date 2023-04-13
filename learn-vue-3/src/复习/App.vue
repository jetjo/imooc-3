// TODO: MVVM框架中的View的一部分
<template>
  <div>
    <button @click="updateAge">父组件：年龄{{ age }}</button>
  </div>

  <p>
    同一个事件类型，在Options
    API中注册的handler总是在（在setup中注册的）handler之后被调用，
    <mark
      >原因可能是：因为setup钩子是第一个被执行的钩子，导致其中的钩子handler也是首先被注册的。</mark
    >
  </p>

  <lifecycleHooks @updateName="updateAge" :name="name"></lifecycleHooks>
  <!-- <lifecycleHooks @updateName="updateAge" :age="age"></lifecycleHooks> -->
</template>

<script>
export default {
  beforeCreate() {
    console.log(2, "父组件", "beforeCreate");
  },
  created() {
    console.log(3, "父组件", "created");
  },
  beforeMount() {
    console.log(4, "父组件", "beforeMount");
  },
  mounted() {
    console.log(10, "父组件", "mounted");
  },
  beforeUpdate() {
    console.log("父组件", "beforeUpdate");
  },
  updated() {
    console.log("父组件", "updated");
  },
  beforeUnmount() {
    console.log("父组件", "beforeUnmount");
  },
  unmounted() {
    console.log("父组件", "unmounted");
  },

  beforeDestroy() {
    console.log("父组件", "beforeDestroy");
  },

  destroyed() {
    console.log("父组件", "destroyed");
  },
};
</script>

// TODO: MVVM框架中的Model
<script setup>
import { ref, reactive, inject } from "vue";
import lifecycleHooks from "./父子组件生命周期钩子时序.vue";

import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  // onBeforeDestroy,
  // onDestroyed,
} from "vue";

console.log(1, "父组件", "setup");

const age = ref(18);
const name = ref("脆脆");

const updateAge = () => {
  age.value = parseInt(Math.random() * 100);
};

onBeforeMount(() => {
  console.log(4, "父组件", "onBeforeMount");
});
onMounted(() => {
  console.log(10, "父组件", "onMounted");
});
onBeforeUpdate(() => {
  console.log("父组件", "onBeforeUpdate");
});
onUpdated(() => {
  console.log("父组件", "onUpdated");
});
onBeforeUnmount(() => {
  console.log("父组件", "onBeforeUnmount");
});
onUnmounted(() => {
  console.log("父组件", "onUnmounted");
});

// onBeforeDestroy(() => {
//   console.log("父组件", "onBeforeDestroy");
// });
// onDestroyed(() => {
//   console.log("父组件", "onDestroyed");
// });
</script>
