<template>
  <h3>指令钩子参数们的含义</h3>
  <div v-learn-directive-hook:[arg].foo="value"></div>
  <div>{{ otherState }}{{ unReactiveState }}</div>
  <button @click="updateArg">更新指令参数</button>
  <button @click="updateValue">更新指令参数值</button>
  <button @click="updateOtherState">更新其他状态</button>
  <button @click="updateValueOtherState">同时指令参数值和其他状态</button>
  <button @click="updateValueOtherUnReactiveState">
    同时指令参数值和其他非响应式状态
  </button>
  <button @click="forceUpdate">强制更新</button>
  <p>
    <mark
      ><strong
        >经测试，如果只更改传递给指令的变量的值，而这个变量又没有间接或直接绑定到组件的模板上或者不是响应式的，并不会触发组件和指令的update钩子</strong
      ></mark
    >
  </p>
  <p>
    <mark
      ><strong
        >经测试，即使在调用指令的update相关钩子之前更新了传递给指令的变量的值，调用update相关钩子时，这些钩子的第二个参数binding.value和binding.oldValue仍然是相等的，
        <br />
        TODO:不知为何，反正无法获取到指令值的救值</strong
      ></mark
    >
  </p>
  <p>
    <mark
      ><strong
        >经测试，在指令钩子内访问组件的使用ref定义的状态时，不用.value!!!!
        应该是已经自动拆包了
        <br />
        TODO:</strong
      ></mark
    >
  </p>
</template>

<script setup>
import { reactive, ref, onUpdated, getCurrentInstance } from "vue";
const currentIns = getCurrentInstance();
const vLearnDirectiveHook = {
  mounted(el, { arg, value, oldValue, modifiers, instance }, vNode) {
    console.log(
      {
        el,
        arg,
        // value: vNode.ctx.setupState.otherState.value,
        value: vNode.ctx.setupState.otherState, //TODO: 不用写.value,应该是已经自动拆包了
        oldValue: el.dataset.otherStateOldValue,
        modifiers,
        instance,
        vNode,
      },
      "directive!!! mounted "
    );
    console.log(
      "directive!!! el.__vueParentComponent.vnode.component === el.__vueParentComponent",
      `${el.__vueParentComponent.vnode.component === el.__vueParentComponent}`
    );
    console.log(
      "directive!!! el.__vnode.ctx === el.__vueParentComponent, 一个vnode的上下文是其父组件实例",
      `${el.__vnode.ctx === el.__vueParentComponent}`
    );
    el.dataset.otherStateOldValue = vNode.ctx.setupState.otherState;
  },
  // prevNode只能在beforeUpdate、updated中获取到
  beforeUpdate(el, { arg, value, oldValue }, vNode, prevNode) {
    console.log(
      {
        arg,
        value: vNode.ctx.setupState.otherState,
        oldValue: el.dataset.otherStateOldValue,
        vNode,
        prevNode,
      },
      "directive!!! beforeUpdate "
    );
    // console.log(
    //   { arg, value, oldValue, vNode, prevNode },
    //   "directive!!! beforeUpdate "
    // );
    console.log(
      "directive!!! beforeUpdate , el.__vnode === prevNode",
      el.__vnode === prevNode
    );
    console.log(
      "directive!!! beforeUpdate , el.__vnode === vNode",
      el.__vnode === vNode
    );
    el.dataset.otherStateOldValue = vNode.ctx.setupState.otherState;
  },
  updated(el, { arg, value, oldValue }, vNode, prevNode) {
    // el.dataset.otherStateOldValue = vNode.ctx.setupState.otherState.value;
    console.log(
      {
        arg,
        value: vNode.ctx.setupState.otherState,
        oldValue: el.dataset.otherStateOldValue,
        vNode,
        prevNode,
      },
      "directive!!! updated "
    );
    window.customDirectiveHookArg = {
      el,
      ctx: el.__vueParentComponent,
      prevNode,
      vNode,
    };
    console.log(
      "directive!!! updated , el.__vnode === prevNode",
      el.__vnode === prevNode
    );
    console.log(
      "directive!!! updated , el.__vnode === vNode",
      el.__vnode === vNode
    );
  },
};

const arg = reactive({ val: "bar" });

const value = reactive({ type: "egg", weight: 50 });

const otherState = ref(0);

function updateArg() {
  arg.val = "bar" + Math.random();
}
function updateValue() {
  value.weight = 50 + Math.random();
}
function updateOtherState() {
  otherState.value = Math.random();
}
function updateValueOtherState() {
  updateOtherState();
  updateValue();
}
let unReactiveState = 0;
function updateValueOtherUnReactiveState() {
  unReactiveState = Math.random();
  updateValue();
}
function forceUpdate() {
  currentIns.ctx.$forceUpdate();
  console.log(currentIns, "directive!!! ");
}
onUpdated(() => {
  console.log(
    "directive!!! parent component updated , el.__vnode === prevNode",
    window.customDirectiveHookArg.el.__vnode ===
      window.customDirectiveHookArg.prevNode
  );
  console.log(
    "directive!!! parent component updated , el.__vnode === vNode",
    window.customDirectiveHookArg.el.__vnode ===
      window.customDirectiveHookArg.vNode
  );
  console.log(
    "directive!!! parent component updated , el === vNode.el",
    window.customDirectiveHookArg.el === window.customDirectiveHookArg.vNode.el
  );
  console.log(
    "directive!!! parent component updated , el === prevNode.el",
    window.customDirectiveHookArg.el ===
      window.customDirectiveHookArg.prevNode.el
  );
  console.log(
    "directive!!! parent component updated , ctx === vNode.ctx",
    window.customDirectiveHookArg.ctx ===
      window.customDirectiveHookArg.vNode.ctx
  );
  console.log(
    "directive!!! parent component updated , ctx === prevNode.ctx",
    window.customDirectiveHookArg.ctx ===
      window.customDirectiveHookArg.prevNode.ctx
  );
  console.log(
    window.customDirectiveHookArg,
    "directive!!! parent component updated"
  );
});
</script>

<style lang="scss" scoped></style>
