<template>
  <h3>指令钩子传参</h3>
  <div v-learn-directive-hook:[argProxy].foo="valueProxy"></div>
  <div v-learn-directive-hook:[argRef].foo.fuck="valueRef"></div>
  <div v-learn-directive-hook:bar.foo.fuck="'value'"></div>
  <div v-learn-directive-hook:[argLet].foo.fuck="valueLet"></div>
  <div v-learn-directive-hook:[argConst].foo.fuck="valueConst"></div>

  <figure>
    <figcaption>
      注意事项,指令的参数值即使是变量，指令前面也不用加冒号，冒号是内建指令v-bind的简写！！！
      <br />
      前面加上冒号，意思就成了组件或标签上有一个属性，名字恰好和自定义指令的名字相同
    </figcaption>
    <pre>
    // runtime-core.esm-bundler.js:557 DOMException: Failed to execute 'setAttribute' on 'Element': 'v-learn-directive-hook:[argRef]' is not a valid attribute name.
    &lt;div :v-learn-directive-hook:[argRef]="valueProxy">&lt;/div>
    // 不报错，但是指令的钩子都未生效，渲染结果是：&lt;div v-learn-directive-hook:bar="[object Object]">&lt;/div>
    &lt;div :v-learn-directive-hook:bar="valueProxy">&lt;/div>
    // 不报错，但是指令的钩子也都未生效，渲染结果是：&lt;div v-learn-directive-hook="[object Object]">&lt;/div>
    &lt;div :v-learn-directive-hook="valueProxy">&lt;/div>
    // 正确的写法：如果valueProxy是组件的状态变量，会自动对应，否则就和没传一样，指令钩子内获取的值是undefined;
    &lt;div v-learn-directive-hook:[argRef].foo="valueProxy">&lt;/div>
    // 如果传递给指令的值就是一个不变的字符串，可以写成如下：
    &lt;div v-learn-directive-hook:[argRef].foo="'value'">&lt;/div>
  </pre
    >
  </figure>
  <figure>
    <figcaption>
      <mark>
        指令的参数是字面值、常量、变量、响应变量不同情形时，探索指令钩子内获取的参数:</mark
      >
    </figcaption>
    <pre>
    <br>指令使用情形：
  &lt;div v-learn-directive-hook:[argProxy].foo="valueProxy">&lt;/div>
  &lt;div v-learn-directive-hook:[argRef].foo.fuck="valueRef">&lt;/div>
  &lt;div v-learn-directive-hook:bar.foo.fuck="'value'">&lt;/div>
  &lt;div v-learn-directive-hook:[argLet].foo.fuck="valueLet">&lt;/div>
  &lt;div v-learn-directive-hook:[argConst].foo.fuck="valueConst">&lt;/div>
  <br>指令定义如下：
  const vLearnDirectiveHook = {
    mounted(_, { arg, value, oldValue })
    {
        console.log({ arg, value, oldValue }, 'directive mounted binding');
    },
 }
 <br>指令绑定的数据如下：
 const argRef = ref({ val: "barRef" });
const argProxy = reactive({ val: "barProxy" });
let argLet = { val: "barLet" };
const argConst = { val: "barConst" };
const valueProxy = reactive({ type: "eggProxy", weight: 50 });
const valueRef = ref({ type: "eggRef", weight: 50 });
let valueLet = { type: "eggLet", weight: 50 };
const valueConst = { type: "eggConst", weight: 50 };
<br>控制台打印截图：
  <img
    src="./自定义指令的钩子内第二个参数 2023-01-30 143239.png"
    mode="scaleToFill"
    alt="自定义指令的钩子内第二个参数 2023-01-30 143239"
  />
  </pre>
  </figure>
  <p>
    <mark
      >结论：如果传递给指令的数据是字面值或者没有响应性的变量，指令钩子内获取的参数就不是响应式的。
      <br />
      如果传递给指令的数据是响应式的不论是ref还是reactive定义的，指令内获取到的都是proxy，深度观察的</mark
    >
  </p>
</template>

<script setup>
// import { vLearnDirectiveHook } from "./指令钩子";
import { reactive, ref } from "vue";
const vLearnDirectiveHook = {
  mounted(_, { arg, value, oldValue }) {
    console.log({ arg, value, oldValue }, "directive mounted binding");
  },
};
const argRef = ref({ val: "barRef" });
const argProxy = reactive({ val: "barProxy" });
let argLet = { val: "barLet" };
const argConst = { val: "barConst" };
const valueProxy = reactive({ type: "eggProxy", weight: 50 });
const valueRef = ref({ type: "eggRef", weight: 50 });
let valueLet = { type: "eggLet", weight: 50 };
const valueConst = { type: "eggConst", weight: 50 };
</script>

<style lang="scss" scoped></style>
