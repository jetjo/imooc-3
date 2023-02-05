<template>
  <div class="box-item">
    <h3>TODO:学习cleanup side effect</h3>
    <div>
      <input
        type="number"
        v-model="id"
        placeholder="别只敲0，多少个0都是一个0，不会触发更新"
      />
      response: {{ responseData }}
    </div>
    <button @click="unmount">
      卸载组件以测试onCleanup注册的回调是否执行，
      <mark>经测试，卸载时可以调用到</mark>
    </button>
    <img src="./截屏2023-02-06 上午5.00.09.png" alt="" />
  </div>
</template>

<script setup>
import { getMockData } from "@/api";
import { watchEffect, inject, ref, onBeforeUnmount, watch } from "vue";
const id = ref(0);
const responseData = ref({});
const stop = watchEffect(
  async (onCleanup) => {
    const [response, cancel] = getMockData({ id });
    onCleanup(cancel);
    responseData.value = await response;
  },
  {
    // flush: 'pre',//默认值，在setup钩子中就执行一次
    flush: "post", //惰性执行，同默认watch(不对！！！)，会在组件渲染完成后执行，和watch默认不一样，组件第一次渲染完后，还是要执行的
    // flush: 'sync',trigger a watcher immediately when a reactive dependency changes, 不会缓存并等待其他可能的依赖变化后以便只执行一次，不用缓存了，如果多个依赖值都变化，会引起多次调用，耗费性能
  }
);
const stop1 = watch(
  () => id.value,
  async (curVal, preVal, onCleanup) => {
    const [response, cancel] = getMockData({ id });
    onCleanup(cancel);
    responseData.value = await response;
  },
  {
    immediate: false,
    deep: false,
    onTrack(e) {
      // debugger;
    },
    onTrigger(e) {
      // debugger;
    },
    // flush: 'pre',//默认值，在setup钩子中就执行一次
    flush: "post", //惰性执行，同默认watch(不对！！！)，会在组件渲染完成后执行，和watch默认不一样，组件第一次渲染完后，还是要执行的
    // flush: 'sync',trigger a watcher immediately when a reactive dependency changes, 不会缓存并等待其他可能的依赖变化后以便只执行一次，不用缓存了，如果多个依赖值都变化，会引起多次调用，耗费性能
  }
);
const unmount = inject("unmount");
onBeforeUnmount(() => {
  // stop();//没必要，组件卸载时会自动停止监听，只有在watcher是异步动态设置（比如在settimeout中）的除外
});
</script>

<style lang="scss" scoped></style>
