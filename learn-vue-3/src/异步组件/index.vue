<template>
  <div class="box">
    <!-- runtime-core.esm-bundler.js:40 [Vue warn]: Component <Anonymous>: setup function returned a promise, 
  but no <Suspense> boundary was found in the parent component tree. 
  A component with async setup() must be nested in a <Suspense> in order to be rendered.  -->
    <h3>异步组件</h3>
    <Suspense>
      <!-- [Vue warn]: <Suspense> slots expect a single root node.  -->
      <!-- #region 如果写template ，则必须显式指定插槽名称 -->
      <!-- <template #default> -->
      <!-- <template> -->
      <div>
        <!-- #region 必须用div包裹一下！！！ -->
        <asynCom_ />
        <asyncSetup />
        <combining-with-other-components />
        <!-- #endregion -->
      </div>
      <!-- </template> -->
      <!-- #endregion -->
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import asyncSetup from "./asyncSetup.vue";
import combiningWithOtherComponents from "./结合路由.vue";
// import asynCom_ from "./asynCom.vue"

// // 定义的异步组件是可以当作普通组件使用的，比如使用app.component方法全局注册
// const asynCom_ = defineAsyncComponent({
//     // 类型与Vue-Router中的每个路由的component属性一致
//     // 打包时的split points
//     loader: () => import('./asynCom.vue'),
//     delay: 200,
//     loadingComponent: LoadingComponent,
//     errorComponent: ErrorComponent,
//     timeout: Infinity
// });
// 简写
const asynCom_ = defineAsyncComponent(() => import("./asynCom.vue"));
</script>

<style lang="scss" scoped>
.box {
  border: 3px solid gold;
  margin: 10px 0;
  :deep(h3) {
    background-color: yellow;
  }
}
</style>
