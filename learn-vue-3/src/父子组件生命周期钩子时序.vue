<template>
  <div class="box">
    <button @click="updateName">点我{{ name }}</button>
    <ol>
      <li>
        如果一个状态没有被绑定到模版上，并且这个状态变化时也不会引起其它绑定到模版上的状态的变化，那么这个状态变化时不会触发update相关的钩子
      </li>
      <li>
        如果父组件将其状态传递给了子组件，即使子组件并没有定义对应的属性，也没有用到传递过来的状态，这个父组件中的状态变化时，仍然会调用update相关的钩子
        <br />
        调用时序如下：
        <ol>
          <li>父组件before Update</li>
          <li>子组件before Update</li>
          <li>子组件updated</li>
          <li>父组件updated</li>
        </ol>
      </li>
      <li>
        如果一个状态绑定到了模版上，或者间接绑定到了模版上，但是并没有传递给子组件，或者这个状态变化时并不会影响其它传递给子组件的状态，那么这个状态更新时，只会调用父组件自己的update钩子
      </li>
      <li>
        如果一个状态绑定到了模版上，或者间接绑定到了模版上，但是其更新时并不会引发父组件的更新，那么就只会调用子组件自己的update钩子
      </li>
      <li>
        如果一个状态变化即会更新模版也会触发父组件状态的更新，那么调用时序如下：
        <ol>
          <li>父组件before Update</li>
          <li>子组件before Update</li>
          <li>父组件updated</li>
          <li>子组件updated</li>
        </ol>
      </li>
      <li>
        注意⚠️：千万不要在updated钩子中更新组件的状态，因为在钩子内时，之前状态的更新已经生效了，在钩子内更新的状态必须引发下一次更新以使它生效，而每一次更新完成都会执行updated钩子，这样就造成了死循环！！！
        <br />
        总之，在updated钩子内改变状态会造成死循环！！！ <br />
        而在beforeUpdate
        钩子内是可以更新组件状态的，因为此时一切状态更新所要造成的DOM更新还未实施，在这个钩子中更新的状态会覆盖之前对这个状态的更新，并且同其他更新一起，在这个钩子完成后生效。
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    console.log(6, "子组件", "beforeCreate");
  },
  created() {
    console.log(7, "子组件", "created");
  },
  beforeMount() {
    console.log(8, "子组件", "beforeMount");
  },
  mounted() {
    console.log(9, "子组件", "mounted");
  },
  beforeUpdate() {
    console.log("子组件", "beforeUpdate");
  },
  updated() {
    console.log("子组件", "updated");
  },
  beforeUnmount() {
    console.log("子组件", "beforeUnmount");
  },
  unmounted() {
    console.log("子组件", "unmounted");
  },

  beforeDestroy() {
    console.log("子组件", "beforeDestroy");
  },

  destroyed() {
    console.log("子组件", "destroyed");
  },
};
</script>

<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  //   onBeforeDestroy,
  //   onDestroyed,
  ref,
} from "vue";

console.log(5, "子组件", "setup");

onBeforeMount(() => {
  console.log(8, "子组件", "onBeforeMount");
});

onMounted(() => {
  console.log(9, "子组件", "onMounted");
});

onBeforeUpdate(() => {
  console.log("子组件", "onBeforeUpdate");
});

onUpdated(() => {
  console.log("子组件", "onUpdated");
});

onBeforeUnmount(() => {
  console.log("子组件", "onBeforeUnmount");
});

onUnmounted(() => {
  console.log("子组件", "onUnmounted");
});

// onBeforeDestroy(() => {
//   console.log("子组件", "onBeforeDestroy");
// });
// onDestroyed(() => {
//   console.log("子组件", "onDestroyed");
// });

const emits = defineEmits(["updateName"]);

const name = ref(0);

const updateName = () => (
  emits("updateName"), (name.value = Math.random() * 100)
);
</script>

<style lang="scss" scoped>
.box {
  text-align: left;
}
</style>
