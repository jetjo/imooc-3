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
        定义在Options API 中的状态，在beforeCreate钩子被调用时还不可用； <br />
        而定义在Composition API中的状态可用，并且有响应性。
      </li>
      <li>
        定义在Options API
        中的计算属性，在beforeCreate钩子中读写都是无效的，即不可用； <br />
        而定义在Composition API中的状态可用，并且有响应性。
      </li>
      <li>
        定义在Options API
        中的属性，在beforeCreate钩子中是可读的，但是在定义属性的组件内部任何地方都是不可写的。
        <br />
        此时在钩子内部属性也无所谓是否有响应性，探讨响应性没有意义，因为组件内，不能更改属性值，属性值的更改只能发生在这个钩子之前，并且也只能在父组件中更新这个属性，在这个钩子之前无论在父组件中更新多少次值，只有最后一个值是生效的；
        总之，定义在Options中的属性，在这个钩子之前属性没有响应性，在这个钩子中无所谓响应性（js单线程的，这个钩子执行时，父组件中更新属性的代码也无法同时执行），在这个钩子之后有响应性。
        <br />
        而定义在Composition
        API中的属性和定义在Options中的属性没有区别，因为时序上不同于挂载，创建的步骤是父组件完全创建完后再执行子组件的setup、beforeCreate、created。
        <br />
        注意⚠️:
        定义在composition中的属性会覆盖掉定义在options中的属性。而不是合并。
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
        // console.log("定义在Options里的状态name被读取了");
        return this.name;
      },
      set(v) {
        // console.log("定义在Options里的状态name被更新了", v);
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
    console.warn("子组件的beforeCreate钩子～");
    console.warn("beforeCreate：只有 Options API 中提供这个钩子！");
    console.warn(
      "beforeCreate：此时，组件的实例已经被创建，可以在钩子内使用this访问！"
    );
    // console.warn("beforeCreate：此时组件的属性已经准备好！");
    // console.warn(
    //   "beforeCreate：但是定义在Options API中的data()和计算属性还未生效！"
    // );
    // this.nm = "bing~1";
    this.$.setupState.nianLing = "100~~~";
    console.log(
      this,
      // this.nm,
      this.$.setupState.nianLing,
      // this.toRaw(this.$data),
      // 在Options中使用Composition API必须显示导入
      // toRaw(this.$data),
      JSON.stringify(this.$data),
      // this.$refs.age,
      // this.$refs.weight,
      JSON.stringify(this.$props),
      "beforeCreate"
    );

    console.log(JSON.stringify(this.$.setupState), "beforeCreate");
    // console.log(this.$ === this._, "beforeCreate");

    // this.$.setupState的类型是Proxy，所以更改其成员值，应该是响应式的
    // this.$.setupState.age++;
    console.log(
      this.name,
      this.money,
      this.nm,
      this.age,
      this.data,
      "beforeCreate"
    );

    // money是属性，不应该在定义他的组件内部修改！！！
    // 'set' on proxy: trap returned falsish for property 'money'
    // this.money = 125;

    console.warn("子组件的beforeCreate钩子～");
  },
  created() {
    console.warn("子组件的created钩子～");
    // this.nm = "bing~~~~1";
    this.$.setupState.nianLing = "1~~~";
    console.log(
      this,
      // this.nm,
      this.$.setupState.nianLing,
      // this.toRaw(this.$data),
      // toRaw(this.$data),
      JSON.stringify(this.$data),
      // this.$refs.age,
      // this.$refs.weight,
      JSON.stringify(this.$props),
      "created"
    );

    // console.log(toRaw(this.$props) === this.$props, "created");
    // console.log(toRaw(toRaw(this.$props)) === toRaw(this.$props), "created");

    console.log(JSON.stringify(this.$.setupState), "created");

    console.log(this.name, this.money, this.nm, this.age, this.data, "created");

    console.warn("子组件的created钩子～");
  },
};
</script>

<script name="lifecycleHooks" setup>
import { ref, reactive, toRaw, watch, computed, getCurrentInstance } from "vue";

console.warn("子组件的setup钩子～");

const { props: optionProps } = getCurrentInstance();

// 组件实例的$data属性中并没有使用ref定义的成员, 并且也不像Options APi的data中定义的成员一样自动成为组件实例this的属性
const age = ref(0);
// 组件实例的$data属性中也没有使用reactive定义的响应式成员, 并且也不像Options APi的data中定义的成员一样自动成为组件实例this的属性
const data = reactive({ weight: 60 });

// // 如果设置immediate为true，那么组件在实例化后就会被调用一次，即使age还是初识默认值（即定义时设置的值）
// // 如果watch中的逻辑针对初始值也要被执行一次，那么immediate就要设置为true
// watch(age, (v) => console.log("年龄更新了！", v), { immediate: false });

const props = defineProps({
  person: {
    type: Object, // 构造函数
    default: () => ({
      age: 100,
      height: 175,
    }),
  },
});

// // 如果被观察的变量类型是Proxy,那么deep是true\false都不管用，就是深度的
// watch(optionProps, (ov, v) => console.log("Options中的属性更新了", v, ov), {
//   immediate: true,
//   deep: false,
// });
watch(
  () => optionProps.person,
  // 如果被监控的是对象，更改对象内部的成员后触发的，新值和旧值是全等的，因为是同一个对象的引用;
  // 当然是除了第一次，如果immediate是true的话，旧值是undefined
  (ov, v) => console.log("Options中的属性更新了", v, ov, v === ov),
  {
    immediate: true,
    // 如果设置为false，更改person中的成员是不触发的
    deep: true,
  }
);

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

console.warn("子组件的setup钩子～");
</script>

<style lang="scss" scoped>
.summary {
  text-align: left;
}
</style>
