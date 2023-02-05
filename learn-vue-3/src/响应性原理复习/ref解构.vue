<template>
  <div class="box box-item">
    <h3>学习reactive解构后的响应性</h3>
    <div>
      <button @click="name = Math.random().toFixed(5)">
        改变解构得到的值类型的属性值
      </button>
      <button @click="state.name = Math.random().toFixed(5)">
        改变state中值类型的属性值
      </button>
      值类型的属性值：{{ name }}
    </div>
    <div>
      <button @click="sanWei = Math.random().toFixed(5)">
        改变解构得到的引用类型的属性值
      </button>
      <button @click="sanWei.height = Math.random().toFixed(5)">
        改变解构得到的引用类型的属性值的属性值
      </button>
      <button @click="state.sanWei = Math.random().toFixed(5)">
        改变state中引用类型的属性值
      </button>
      <button @click="state.sanWei.height = Math.random().toFixed(5)">
        改变state中引用类型的属性值的属性值
      </button>
      引用类型的属性值：{{ sanWei }}
    </div>

    <div>state: {{ state }}</div>

    <p>
      <mark
        >ref.value如果是一个对象，更改这个对象的属性值也可以触发页面更新，因为是通过ref.value更改的仍然会被追踪</mark
      >
    </p>
    <p>
      <mark
        >ref.value是一个对象，如果对象的属性又是一个对象，解构这个ref.value得倒的属性仍然是响应式的，并且是proxy类型</mark
      >
    </p>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
const state = ref({
  name: "柳如是",
  sanWei: { height: 180, weight: 70, bust: "D", waist: 100, hips: 140 },
});
const { name, sanWei } = state.value;

watch(sanWei, () => alert("proxy sanWei更新了"), { deep: false });
watch(state, () => alert("ref sanWei更新了"), { deep: false });
</script>

<style lang="scss" scoped></style>
