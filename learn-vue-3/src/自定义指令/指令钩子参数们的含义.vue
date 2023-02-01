<template>
  <h3>指令钩子参数们的含义</h3>
  <div>{{ otherState }}{{ unReactiveState }}</div>
  <button @click="updateArg">更新指令参数</button>
  <div v-learn-directive-hook:[arg].foo="stateProxy1">
    <button @click="updateStateProxy1">
      v-learn-directive-hook="stateProxy1" 更新stateProxy1.weight
    </button>
  </div>
  <div v-learn-directive-hook:[arg].foo="valueRef1">
    <button @click="updateValue1">
      v-learn-directive-hook="valueRef1" 更新valueRef1.value.weight
    </button>
  </div>
  <div v-learn-directive-hook:[arg].foo="stateProxy2infoObjCompute">
    <!-- <div v-learn-directive-hook:[arg].foo="stateProxy2.infoObj">TypeError: Cannot read properties of undefined (reading 'infoObj') -->
    <button @click="updateStateProxy2">
      v-learn-directive-hook="stateProxy2infoObjCompute" 更新stateProxy2.infoObj
    </button>
    <button @click="updateStateProxy3">
      v-learn-directive-hook="stateProxy2infoObjCompute"
      更新stateProxy2.infoObj.weight
    </button>
  </div>

  <div v-learn-directive-hook:[arg].foo="valueRef2">
    <button @click="updateValue2">
      v-learn-directive-hook="valueRef2" 更新valueRef2.value
    </button>
  </div>
  <div v-learn-directive-hook:[arg].foo="valueRef3WeightCompute">
    <button @click="updateValue3">
      v-learn-directive-hook="valueRef3WeightCompute" 更新valueRef3.value.weight
    </button>
  </div>
  <div v-learn-directive-hook:[arg].foo="valueRef1Compute">
    <button @click="updateValue1">
      v-learn-directive-hook="valueRef4Compute" 更新valueRef4.value.weight
    </button>
  </div>
  <div v-learn-directive-hook:[arg].foo="letObj">
    <button @click="updateLetObj">
      v-learn-directive-hook="letObj" 更新letObj
    </button>
    <button @click="updateLetObjMember">
      v-learn-directive-hook="letObj" 更新letObj.weight
    </button>
  </div>
  <div v-learn-directive-hook:[arg].foo="letObj1WeightCompute">
    <button @click="updateLetObj1Member">
      v-learn-directive-hook="letObj1WeightCompute" 更新letObj1.weight
      {{ letObj1WeightCompute }}
    </button>
  </div>

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
  <p>
    <mark
      ><strong
        >经测试，经测试指令等号后面写的是(被视为)变量名或者是使用单引号包裹的字符串字面量
        <br />
        这就是为什么如果指定等号后的东西如果不用单引号包裹时，是不能有“.”的，即不能这么写：directive=“varName.memberName”
        <br />
        directive="varName" <br />
        directive="'字符串'"
        <br />
        TODO:</strong
      ></mark
    >
  </p>
  <p>
    <mark
      ><strong
        >经测试，作为指令的值传递给指令的变量，如果是一个对象，那么只更改变量对象的成员值并不能触发update钩子，也就是没有深度观察。所以要想触发指令的update钩子，必须给变量对象整体赋值。
        <br />
        又或者指令的业务逻辑只是需要一个变量对象内的某一个成员，可以为这个成员创建一个计算属性，并将这个计算属性作为值传递给指令，这样就可以在只更新变量对象内部成员值的情况下触发指令的钩子。
        <br />
        又或者作为指令值的对象变量同时也间接或直接绑定到了组件模版上，并且这个变量是响应式的，那么此时只更新变量内部的成员也可以触发指令的update钩子，但是！update的相关钩子的binding参数中，binding.value和binding.oldValue是相等的都是更改后的值。

        <br />
        TODO:猜测：即使绑定到指令值的变量对象不是响应式的，这个变量对象更新时只要是整个重新赋值的就可以出发update钩子。<br />
        经测试发现不是这样。。。 要想触发指令、组件的update相关钩子，
        变量必须是可观察的，如果不是，即使使用compute计算属性转化也不行。。。
      </strong></mark
    >
  </p>
</template>

<script setup>
import { reactive, ref, onUpdated, getCurrentInstance, computed } from "vue";
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

const stateProxy1 = reactive({ type: "egg", weight: 50 });
const valueRef1 = ref({ type: "egg", weight: 50 });
const stateProxy2 = reactive({ infoObj: { type: "egg", weight: 50 } });
const valueRef2 = ref({ type: "egg", weight: 50 });
const valueRef3 = ref({ type: "egg", weight: 50 });
const stateProxy2infoObjCompute = computed(() => stateProxy2.infoObj);
const valueRef3WeightCompute = computed(() => valueRef3.value.weight);
// const valueRef1Compute = computed(valueRef1);Uncaught TypeError: this.fn is not a function
// const valueRef1Compute = computed(() => valueRef1.value);不行
const valueRef1Compute = computed(() => valueRef1); //不行。。。
let letObj = { type: "egg", weight: 50 };
let letObj1 = { type: "egg", weight: 50 };
const letObj1WeightCompute = computed(() => letObj1.weight);
function updateLetObj() {
  letObj = { type: "egg", weight: 100 * Math.random() };
}
function updateLetObjMember() {
  letObj.weight = 100 * Math.random();
}
function updateLetObj1Member() {
  letObj1.weight = 100 * Math.random();
}

const otherState = ref(0);

function updateArg() {
  arg.val = "bar" + Math.random();
}
function updateValue1() {
  valueRef1.value.weight = 50 + Math.random();
}
function updateValue2() {
  valueRef2.value = { type: "egg", weight: 100 * Math.random() };
}
function updateValue3() {
  valueRef3.value.weight = 50 + Math.random();
}
function updateStateProxy1() {
  stateProxy1.weight = 50 + Math.random();
}
function updateStateProxy2() {
  stateProxy2.infoObj = { type: "egg", weight: 100 * Math.random() };
}
function updateStateProxy3() {
  stateProxy2.infoObj.weight = 100 * Math.random();
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
