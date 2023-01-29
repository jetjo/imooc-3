<template>
  <div>
    <button @click="handleClick">确认一下setup中能做什么：</button>
    <ol class="box">
      <li>首先，可以使用传递的属性值做一些事情</li>
      <li>可以定义状态、计算属性、监听器、方法、生命周期钩子等等</li>
      <li>计算属性及监听器关联的状态要先于属性和监听器定义</li>
      <li>定义的方法可以在setup任意位置使用，因为方法会自动提升？</li>
      <li>
        <mark
          >本测试还确定了：proxy类型的状态本身就是深度观察的，
          而ref类型的对象状态不是</mark
        >
      </li>
      <li>
        <mark
          >本测试明确了immediate的作用，即如果想要对所监控的初始值（状态的初始值、属性的初始值或者父组件传递的值）做一些逻辑处理，就要设置为true</mark
        >
      </li>
    </ol>
  </div>
</template>

<script setup>
import { getCurrentInstance, watch, reactive, ref } from "vue";
// 虽然在这里可以调用这个方法，但是方法中访问的状态此时还未定义，会抛出异常 Cannot access 'stateProxy' before initialization
// handleClick();

const { props } = getCurrentInstance();

watch(props, (v) => console.log(v.age, "属性age更新了"), {
  deep: false,
  immediate: true,
});

watch(propsInSetup, (v) => console.log(v.age, "属性age更新了"), {
  deep: false,
  immediate: true,
});

const propsInSetup = defineProps({
  age: Number,
});

// // Cannot access 'stateProxy' before initialization
// watch(stateProxy, (v) => console.log(v.weight, "proxy状态 weight更新了"), {
//   deep: false,
//   immediate: true,
// });
// // Cannot access 'stateRef' before initialization
// watch(stateRef, (v) => console.log(v.height, "ref状态 height更新了"), {
//   deep: false,
//   immediate: true,
// });
const stateProxy = reactive({ weight: 60 });
watch(stateProxy, (v) => console.log(v.weight, "proxy状态 weight更新了"), {
  deep: false,
  immediate: true,
});
const stateRef = ref({ height: 180 });
watch(stateRef, (v) => console.log(v.height, "ref状态 height更新了"), {
  //   deep: true,
  //   immediate: true,
});

function handleClick() {
  stateProxy.weight = parseInt(100 * Math.random());
  stateRef.value.height = parseInt(200 * Math.random());
}
</script>

<style lang="scss" scoped>
.box {
  text-align: left;
  border: 1px solid gold;
  margin: 10px;
}
</style>
