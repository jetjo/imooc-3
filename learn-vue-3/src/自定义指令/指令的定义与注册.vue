<template>
  <div>
    <h3>指令的定义与注册</h3>
    <figure>
      <figcaption>在setup中</figcaption>
      <pre>
// 在setup中定义时，指令名称必须是以小写字母v开头的camelCase风格
// 在setup中只要导入或者定义的对象的名称符合上述要求，就被视为自定义指令，可以直接在本组件模板内使用
const vFocus = {
  mounted(el) {
    el?.focus();
  },
};
        </pre
      >
    </figure>
    <figure>
      <figcaption>在options api中</figcaption>
      <pre>
const focus = {
  mounted(el) {
    el?.focus();
  },
};
export default {
  directives: {
    focus,
  },
};
        </pre
      >
    </figure>
    <input type="text" />
    <input type="text" v-focus />
    <p>
      只有在业务逻辑不得不通过直接操作DOM实现时才使用自定义指令，因为相对于内建的指令，自定义指令的效率和服务端渲染方面都不友好
    </p>
  </div>
</template>

<!--
    <script>
    const focus = {
        mounted(el) {
            el?.focus();
        },
    };
    export default {
        directives: {
            focus,
        },
    };
</script>
-->

<script setup>
// 在setup中定义时，指令名称必须是以小写字母v开头的camelCase风格
// 在setup中只要导入或者定义的对象的名称符合上述要求，就被视为自定义指令，可以直接在本组件模板内使用
const vFocus = {
  mounted(el) {
    // el?.focus();
  },
};
</script>

<style lang="scss" scoped></style>
