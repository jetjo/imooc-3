<template>
  <div class="box">
    <p>
      <button @click="updateName">子组件：名称{{ name }}</button>
    </p>
    <p>
      <button @click="updateParentAge">父组件传递的年龄：{{ age }}</button>
    </p>
    <p><button @click="updateNameParentAge">更新姓名和父组件年龄</button></p>
    <ol>
      <li>
        如果一个状态没有被绑定到模版上，并且这个状态变化时也不会引起其它绑定到模版上的状态的变化，那么这个状态变化时不会触发update相关的钩子
      </li>
      <li>
        如果父组件将其状态A传递给了子组件，即使子组件并没有定义对应的属性，也没有用到传递过来的状态，这个父组件的状态A变化时，仍然会调用子组件update相关的钩子
        <br />
        调用时序如下：<br />
        <mark>
          因为父组件将变化了的状态传递给了子组件，子组件属于父组件模版的一部分，所以父组件在updated钩子之前重新生成部分vnode时，也要调用子组件的渲染函数生成子组件的vnode
          （因为子组件的vnode也属于父组件中需要更新的vnode中的一部分）所以导致子组件的updated钩子在父组件的updated之前执行了。
        </mark>
        <ol>
          <li>父组件before Update</li>
          <li>子组件before Update</li>
          <li>子组件updated</li>
          <li>父组件updated</li>
        </ol>
      </li>
      <li>
        如果一个状态绑定到了模版上，或者间接绑定到了模版上，但是并不是传递给子组件，或者这个状态变化时并不会影响其它传递给子组件的状态，那么这个状态更新时，只会调用父组件自己的update钩子
      </li>
      <li>
        子组件内如果不发射事件导致父组件的状态更新，子组件自身的状态更新是不会触发父组件的update相关钩子的
      </li>
      <li>
        子组件内如果发射事件导致父组件的状态更新，但是子组件自身状态未更新，子组件自身的update相关钩子不会调用
      </li>
      <li>
        <mark>
          如果父子组件的状态都更新了，但是传递给子组件的状态没有更新，那么父组件在updated前更新vnode时是不需要更新子组件的vnode的，所以不会使得子组件的updated在父组件的updated之前调用
        </mark>
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
  toRef,
  nextTick,
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

const emits = defineEmits(["updateName"]);

const name = ref(0);

const props = defineProps(["age", "name"]);
const age = toRef(props, "age");
const parentName = toRef(props, "name");
// const age = ref(12);

const updateName = () => (name.value = Math.random() * 100);
const updateParentAge = () => emits("updateName");
const updateNameParentAge = () => {
  // setTimeout(() => {
  //   updateParentAge();
  // }, 0);
  // NOTE: 测得，使用setTimeout类似于使用nestTick，会将要执行的代码延后到updated回调后执行（假如当前的同步代码会引发的更新的话）
  // setTimeout(() => {
  //   console.log("异步更新状态！");
  //   updateName();
  // }, 0);
  // nextTick(() => {
  //   console.log("异步更新状态！");
  updateName();
  updateParentAge();
  // });
};
</script>

<style lang="scss" scoped>
.box {
  text-align: left;
  border: 1px solid hsl(50, 75%, 50%);
}
</style>
