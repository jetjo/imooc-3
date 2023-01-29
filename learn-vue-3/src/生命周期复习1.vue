<template>
  <div class="box">
    确定一件事：setup钩子中定义的属性覆盖掉了Options中定义的属性，那么
    setup钩子是在 Options 中的属性变得可用之后执行的。<br />
    确认的办法：在setup钩子中定义属性之前，打印组件实例的属性，在定义属性后再打印一次。
    <br />
    通过测试推测：Options
    中的属性变得可用可能不是发生在setup钩子前，而是在setup钩子中定义属性时一同执行的，因为在setup钩子定义属性之前，打印props是空的。
    <br />
    由于options API
    中的beforeCreate钩子是在setup钩子后执行的，所以可以肯定在beforeCreate钩子中可以根据父组件传递的属性值做一些事情。
    <br />
    <mark
      >并且发现，在setup钩子中即使是在defineProps之前打印属性，属性都是可用的，因为测试发现如果父组件传递了属性值的话，在defineProps调用之前打印props，能够获得传递的属性值。</mark
    >
    <br />
    <mark
      >所以属性的初始化发生在setup之前，也就是不仅仅在beforeCreate里可以使用属性值，即使在setup钩子里的最前面也可以使用父组件传递的属性值，如果父组件没有传递，则属性是默认值，总之在setup中也是可用的。</mark
    >
  </div>
</template>

<script>
export default {
  props: {
    age: Number,
  },
};
</script>

<script setup>
import { getCurrentInstance } from "vue";
const { props } = getCurrentInstance();

// JSON.parse(JSON.stringify会忽略掉undefined
console.log({ props: JSON.parse(JSON.stringify(props)) });

const propsInSetup = defineProps({
  weight: Number,
  height: {
    type: Number,
    default: 180,
  },
  price: Number,
});
// props是Proxy。天然就是深度观察的
console.log({ props });
</script>

<style lang="scss" scoped>
.box {
  text-align: left;
  border: 1px solid gold;
  margin: 10px;
}
</style>
