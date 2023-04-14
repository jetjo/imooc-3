<template>
  <div class="box-item">
    <h3>学习computed计算属性</h3>
    <div>
      <input type="number" min="800" max="5000" v-model="priceOnce" />
      <button @click="handleClick">更改一次的价格</button>
      <p>价位：{{ girl.price }}</p>
    </div>
    <p>
      <mark
        >经测试可见，计算属性是经过优化的特殊的ref，因为更改计算属性price的值时是通过price.value赋值的
        <br />
        还有就是计算属性所监听的状态即使是ref封装的对象，也是深度监听的，不像watch监听一个ref封装的对象一样可以使用deep参数控制监听，因为在计算属性set中更新girl.price的值，计算属性的get值会跟着变化。
      </mark>
    </p>
    <p>
      <!-- <mark>测试还发现，watch会在页面重新渲染前触发</mark> -->
    </p>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, ref, reactive, watch } from "vue";

const { proxy } = getCurrentInstance();

const priceOnce = ref(3000);
// const girl = {
//   name: "柳如是",
//   price: {
//     once: 3000,
//     oneNight: 8000,
//   },
// };
// const girl = ref({
//   name: "柳如是",
//   price: {
//     once: 3000,
//     oneNight: 8000,
//   },
// });
const girl = reactive({
  name: "柳如是",
  price: {
    once: 3000,
    oneNight: 8000,
  },
});
const price = computed({
  get() {
    console.log("计算属性get 1");
    return girl.price.once; //如果girl不具备响应性，则当girl.price.once发生变化时，computed price get属性值不再变化
    // return girl.value.price.once;
  },
  set(value) {
    console.log("计算属性set 1");
    girl.price = {
      // girl.value.price = {
      once: value,
      oneNight: value * 3 - value / 3,
    };
    console.log("计算属性set 2");
  },
});

watch(girl, () => alert("girl的价格变化了"));

const handleClick = () => {
  console.log("handleClick 1", price);
  price.value = priceOnce.value;
  console.log("handleClick 2", price);
}; //, proxy.$forceUpdate()
</script>

<style lang="scss" scoped></style>
