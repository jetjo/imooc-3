// TODO: MVVM框架中的View的一部分
<template>
  <!-- <div>
    <button @click="triggerUpdate" :data-msg="msg">触发更新</button>
    <button @click="triggerUnmount">触发卸载</button>
  </div> -->
  <div>
    <button @click="triggerUnmount">触发卸载</button>
    <button @click="updateAge">点我{{ age }}</button>
  </div>
  <HelloWorld msg="V + V" />
  <!-- <lifecycleHooks @updateName="updateAge"></lifecycleHooks> -->
  <!-- <lifecycleHooks :money="age" :person="person"></lifecycleHooks> -->
  <keep-alive>
    <component :is="tabs[activedComponent]" />
  </keep-alive>
  <lifecycleRe1 :weight="10"></lifecycleRe1>
  <lifecycleRe2 />
  <lifecycleRe3 />
  <lifecycleRe4 :age="18" />
  <lifecycleRe5 />
  <dynamic-com></dynamic-com>

  <asyncCom />
  <custom-directive></custom-directive>

  <teleport1></teleport1>

  <reactiveLearn />
  <reactiveLearn1 />
  <refLearn />
  <toRefsLearn />
  <toRefLearn />
  <computedLearn />
  <watchLearn />
  <readonlyInject />

  <reactiveUnwrap />
  <refUnwrapping />

  <refWrapObj />
  <watchCleanup />
  <plugin-learn></plugin-learn>
</template>

<script>
export default {
  beforeCreate() {
    // console.warn("父组件的beforeCreate钩子～");
    this.$.setupState.age = 57;
    this.$.setupState.person.age = 18;
    // console.warn("父组件的beforeCreate钩子～");
    console.log(2, "父组件", "beforeCreate");
  },
  created() {
    // console.warn("父组件的created钩子～");
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
import HelloWorld from "./components/HelloWorld.vue";
import { ref, reactive, inject } from "vue";
// import lifecycleHooks from "./生命周期.vue";
import lifecycleHooks from "./父子组件生命周期钩子时序.vue";

// import unNamedComponent from "./组件的名称属性/无名组件.vue";
import UnNamedComponent from "./组件的名称属性/无名组件.vue";
// import namedComponent from "./组件的名称属性/命名组件.vue";
import NamedComponent from "./组件的名称属性/命名组件.vue";

import lifecycleRe1 from "./生命周期复习1.vue";
import lifecycleRe2 from "./生命周期复习2-Options中的方法.vue";
import lifecycleRe3 from "./生命周期复习3setup.vue";
import lifecycleRe4 from "./生命周期复习4setup.vue";
import lifecycleRe5 from "./生命周期5总结.vue";

import reactiveLearn from "./响应性原理复习/reactive数组.vue";
import reactiveLearn1 from "./响应性原理复习/reactive解构.vue";

import refLearn from "./响应性原理复习/ref解构.vue";

import teleport1 from "./teleport1.vue";
import toRefsLearn from "./响应性原理复习/toRefs解构.vue";
import toRefLearn from "./响应性原理复习/toRef解构.vue";
import computedLearn from "./响应性原理复习/computed计算属性.vue";

import watchLearn from "./响应性原理复习/watch和watcheffect.vue";

import readonlyInject from "./响应性原理复习/响应式状态注入/readonly与响应式数据注入.vue";

import reactiveUnwrap from "./响应性原理复习/自动unwrap特性/reactiveUnwrap.vue";

import refUnwrapping from "./响应性原理复习/自动unwrap特性/refUnwrapping.vue";

import refWrapObj from "./响应性原理复习/ref封装对象.vue";

import watchCleanup from "./watch和watchEffect的参数及返回值.vue";

import pluginLearn from "./插件/index.vue";

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

// // [Vue warn]: Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead,
// // and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of`ref`.
// const activedComponent = ref(unNamedComponent);
// const activedComponent = ref("un-named-component");
const activedComponent = ref("UnNamedComponent");

const a = ref(true);

const tabs = {
  UnNamedComponent,
  NamedComponent,
};

// console.warn("父组件的setup钩子～");
console.log(1, "父组件", "setup");

const age = ref(18);
const person = reactive({
  name: "柳如是",
  height: 180,
  weight: 80,
});
const updateAge = () => {
  age.value = parseInt(Math.random() * 100);
  person.age = age.value;
  if (a.value) {
    // activedComponent.value = "named-component";
    activedComponent.value = "NamedComponent";
  } else {
    // activedComponent.value = "un-named-component";
    activedComponent.value = "UnNamedComponent";
  }
  a.value = !a.value;
};

// console.warn("父组件的setup钩子～");

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
function triggerUpdate() {
  updateAge();
}
const _unmount_ = inject("unmount");
function triggerUnmount() {
  _unmount_();
}
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
