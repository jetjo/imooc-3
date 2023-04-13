<template>
  <div>
    <p>
      <a href="https://vuejs.org/guide/essentials/reactivity-fundamentals.html"
        >VUE 3 Options API 基础</a
      >
    </p>
    <p>
      <a href="https://vuejs.org/guide/essentials/reactivity-fundamentals.html"
        >VUE 3 Composition API 基础</a
      >
    </p>
    <ol class="summary">
      <li>
        定义在Options API
        中的计算属性/data状态，在beforeCreate钩子中读写都是无效的，即不可用，组件实例this还没有定义这些成员；
        <br />
        而定义在Composition API中的状态可用，并且有响应性。
      </li>
      <li>
        定义在Options API
        中的属性，在beforeCreate钩子中是可读的，可用于做一些初始化工作
        <br />
        此时在钩子内部属性也无所谓是否有响应性，探讨响应性没有意义，因为组件内，不能更改属性值，属性值的更改只能发生在这个钩子之前，并且也只能在父组件中更新这个属性，在这个钩子之前无论在父组件中更新多少次值，只有最后一个值是生效的；
        总之，定义在Options中的属性，在这个钩子之前属性没有响应性，在这个钩子中无所谓响应性（js单线程的，这个钩子执行时，父组件中更新属性的代码也无法同时执行），在这个钩子之后有响应性。
        <br />
        而定义在Composition
        API中的属性和定义在Options中的属性没有区别，因为时序上不同于挂载步骤，对于创建步骤而言，是父组件完全创建完后再执行子组件的创建（setup、beforeCreate、created）。
        <br />
        注意⚠️:
        在composition中定义属性会使定义在options中的属性完全失效。而不是合并。
        <br />
        还有一点：因为在before Create时props就是可用的了，所以在before Create
        钩子之后created钩子之前，使得data函数返回的状态可用时可以使用props中的成员初始化状态。
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "bing",
      // 因为在before Create时props就是可用的了，所以在before Create 钩子之后created钩子之前，执行data函数返回状态时，可以使用props中的成员初始化状态。
      myMoney: this.money,
    };
  },
  props: {
    money: {
      type: Number, // 构造函数
      default: 100,
    },
  },
  computed: {
    // 这样写，VUE无法把this指向组件的实例，this是undefined
    // nm: () => this.name,
    // nm() {
    //   return this.name;
    // },
    nm: {
      get() {
        console.log("定义在Options里的状态name被读取了");
        return this.name;
      },
      set(v) {
        console.log("定义在Options里的状态name被更新了", v);
        this.name = v;
      },
    },
  },
  watch: {
    money(o, v) {
      console.log("属性更新了", v, o);
    },
  },
  beforeCreate() {
    // console.warn("子组件的beforeCreate钩子～");
    // console.warn("beforeCreate：只有 Options API 中提供这个钩子！");
    // console.warn(
    //   "beforeCreate：此时，组件的实例已经被创建，可以在钩子内使用this访问！"
    // );
    // console.warn("beforeCreate：此时组件的属性已经准备好！");
    // console.warn(
    //   "beforeCreate：但是定义在Options API中的data()和计算属性还未生效！"
    // );
    // NOTE: 此时赋值，带到beforeCreate钩子后初始化data时会被覆盖掉
    // this.nm = "bing~1";
    // this.$.setupState.nianLing = "100~~~";
    console.log(
      this,
      // this.$.setupState.nianLing,
      // 在Options中使用Composition API必须显示导入
      // toRaw(this.$data),
      // this.$refs.age,
      // JSON.stringify(this.$props),
      this.name, // Options API中的状态
      this.myMoney, // Options API中的状态
      this.nm, // Options API中的计算属性
      this.money, // Options API中的属性
      this.age, // setup中的状态
      this.weight, // setup中的状态
      this.nianLing, // setup中的计算属性
      this.person, // setup中的属性
      "beforeCreate"
    );

    // NOTE: 这种属性不标准，没必要测试，说不定哪天就变了
    // this.$.setupState的类型是Proxy，所以更改其成员值，应该是响应式的

    // money是属性，不应该在定义他的组件内部修改！！！
    // 'set' on proxy: trap returned falsish for property 'money'
    // this.money = 125;
  },
  created() {
    // console.warn("子组件的created钩子～");
    this.nm = "bing~~~~2";
    console.log(
      this,
      // this.$.setupState.nianLing,
      // 在Options中使用Composition API必须显示导入
      // toRaw(this.$data),
      // this.$refs.age,
      // JSON.stringify(this.$props),
      this.name, // Options API中的状态
      this.myMoney, // Options API中的状态
      this.nm, // Options API中的计算属性
      this.money, // Options API中的属性
      this.age, // setup中的状态
      this.weight, // setup中的状态
      this.nianLing, // setup中的计算属性
      this.person, // setup中的属性
      "beforeCreate"
    );
  },
};
</script>

<script name="lifecycleHooks" setup>
import {
  ref,
  reactive,
  toRaw,
  watch,
  computed,
  getCurrentInstance,
  onMounted,
} from "vue";

const { props: optionProps } = getCurrentInstance();
console.warn("子组件的setup钩子～", optionProps.person, optionProps.money);

onMounted(() => {
  console.warn("onMounted钩子", optionProps.person, optionProps.money);
});

// 组件实例的$data属性中并没有使用ref定义的成员, 并且也不像Options APi的data中定义的成员一样自动成为组件实例this的属性
const age = ref(0);
// 组件实例的$data属性中也没有使用reactive定义的响应式成员, 并且也不像Options APi的data中定义的成员一样自动成为组件实例this的属性
const data = reactive({ weight: 60 });

// const props = defineProps({
//   person: {
//     type: Object, // 构造函数
//     default: () => ({
//       age: 100,
//       height: 175,
//     }),
//   },
// });

const nianLing = computed({
  get() {
    // console.log("定义在Composition里的状态age被读取了");
    return age.value;
  },
  set(v) {
    // console.log("定义在Composition里的状态age被更新了", v);
    age.value = v;
  },
});

// console.warn("子组件的setup钩子～");
</script>

<style lang="scss" scoped>
.summary {
  text-align: left;
}
</style>
