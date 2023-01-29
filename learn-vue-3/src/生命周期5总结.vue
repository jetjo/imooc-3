<template>
  <div>
    <ol>
      <li>
        不考虑setup的话，在Options中，在beforeCreate钩子前、中，实例已经创建，但是只有属性是可用的
      </li>
      <li>
        beforeCreate之后，created之前，options中的状态（包括计算属性、watch、<mark
          >依赖注入</mark
        >
        等响应性）才变得可用
      </li>
      <li>created钩子之后， beforeMount钩子前，template模版被编译为渲染函数</li>
      <li>
        beforeMount钩子后，mounted钩子前，执行了渲染函数(和状态结合，即将状态渲染进dom)创建了html片段并且挂载到DOM上
      </li>
    </ol>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
div {
  text-align: left;
}
</style>
