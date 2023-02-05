<template>
  <div>
    <p><button @click="changeAge">更新年龄</button></p>
    <p>
      <input type="text" v-model="name" /><button @click="changeGirl(name)">
        换一个妞
      </button>
    </p>
    <p>
      <input type="text" v-model="name" /><button @click="changeName(name)">
        更新Name
      </button>
    </p>
    <p><button @click="changeVar">更新变量</button></p>

    <p><button @click="changeAgeInSelf">子组件内更新年龄</button></p>
    <p>
      <input type="text" v-model="name" /><button
        @click="changeGirlInSelf(name)"
      >
        子组件内换一个妞
      </button>
    </p>
    <p>
      <input type="text" v-model="name" /><button
        @click="changeNameInSelf(name)"
      >
        子组件内更新Name
      </button>
    </p>
    <p><button @click="changeVarInSelf">子组件内更新变量</button></p>

    <figure>
      <figcaption>经测试发现的“惊天”秘密㊙️⚠️</figcaption>
      <mark
        ><strong
          >如果注入的是一个ref,那么在注入时会发生真正意义上的unwrapping!!!,
          ref(0)会变为0，ref({})会变为reactive({})</strong
        ></mark
      >
      <br />
      <mark
        ><strong
          >如果注入的是一个ref,并且在外面包裹readonly对于ref是不起作用的</strong
        ></mark
      >
      <br />
    </figure>
  </div>
</template>

<script setup>
import { inject, ref, readonly } from "vue";
const {
  refVar,
  refConstObj,
  refObj,
  proxyState,
  changeAge,
  changeGirl,
  changeName,
  changeVar,
} = inject("girls", {});
const refConstObjReadonly = readonly(refConstObj);
const refObjReadonly = readonly(refObj);
const name = ref("秋秋");

const changeAgeInSelf = () => (proxyState.age = Math.random()); //[Vue warn] Set operation on key "age" failed: target is readonly.
// const changeVarInSelf = () => (refVar.value = Math.random());注入后refVar 变为了没有响应性的值类型，在此处就是一个数字了
// const changeVarInSelf = () => (refVar = Math.random());Uncaught TypeError: Assignment to constant variable.
const changeVarInSelf = () => console.log("办不到");
// const changeNameInSelf = (name = "秋秋") => (refConstObj.value.name = name);注入后由{ value: reactive({}) } 变为了reactive({})
// const changeNameInSelf = (name = "秋秋") => (refConstObj.name = name);//refConstObj仍然是可写的
const changeNameInSelf = (name = "秋秋") => (refConstObjReadonly.name = name); //[Vue warn] Set operation on key "name" failed: target is readonly.
// const changeGirlInSelf = (name = "秋秋") => (refObj.value = { name });
// const changeGirlInSelf = (name = "秋秋") => (refObj = { name });Uncaught TypeError: Assignment to constant variable.
const changeGirlInSelf = (name = "秋秋") => console.log("办不到");
</script>

<style lang="scss" scoped></style>
