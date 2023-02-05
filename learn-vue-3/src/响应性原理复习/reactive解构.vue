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
        >更改非响应式的变量，变量会改变，但不会触发页面更新，而是等到如果有响应式状态变化引起页面重新渲染时更新页面上对应的地方</mark
      >
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const state = reactive({
  name: "柳如是",
  sanWei: { height: 180, weight: 70, bust: "D", waist: 100, hips: 140 },
});
const { name, sanWei } = state;
</script>

<style lang="scss" scoped></style>
