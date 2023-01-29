<template>
  <div class="box">
    探索一下定义在Options中的方法最早何时可用 <br />
    <mark>经测试，在setup中定义在Options中的method还是undefined</mark>
    <mark
      >发现如果在setup钩子中抛出异常，组件根本无法挂载，确切说是在挂载前抛出异常都无法挂载。</mark
    >
  </div>
</template>

<script>
export default {
  methods: {
    __fuckOneNight() {
      console.log("fuck!");
    },
  },
  beforeCreate() {
    console.log(
      this.__fuckOneNight,
      "在beforeCreate钩子中看看定义在methods中的方法是否可用"
    );
    // this.__fuckOneNight();
  },
  created() {
    console.log(
      this.__fuckOneNight,
      "在created钩子中看看定义在methods中的方法是否可用"
    );
    this.__fuckOneNight();
  },
};
</script>

<script setup>
import { getCurrentInstance } from "vue";
// const { __fuckOneNight } = getCurrentInstance();
// __fuckOneNight();报错
const __this = getCurrentInstance();
console.log({ __this });
const {
  ctx: { __fuckOneNight: fuckOneNight0 },
  proxy: { __fuckOneNight: fuckOneNight1 },
} = getCurrentInstance();
console.log(`typeof ctx.__fuckOneNight === ${typeof fuckOneNight1}`);
console.log(
  `ctx.__fuckOneNight === proxy.__fuckOneNight //`,
  fuckOneNight0 === fuckOneNight1
);

// fuckOneNight0();
// fuckOneNight1();
</script>

<style lang="scss" scoped>
.box {
  text-align: left;
  border: 1px solid gold;
  margin: 10px;
}
</style>
