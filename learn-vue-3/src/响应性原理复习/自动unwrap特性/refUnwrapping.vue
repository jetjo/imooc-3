<template>
  <div class="box-item">
    <h3>探索refState的unwrap特性</h3>
    <div>
      <p>count：{{ count }}</p>
      <p>obj: {{ obj }}</p>
      <p><button @click="count++">更改count</button></p>
      <p><button @click="updateObjCount">更改obj</button></p>
      <p><button @click="updateObjCount1">更改obj1</button></p>
      <p><button @click="updateObjCount2">更改obj2数组中的ref状态</button></p>
      <p><button @click="updateObjCount3">更改obj3Map中的ref状态</button></p>
    </div>
    <div>
      <p>
        <mark
          >通过打印obj和count可知，官方文档上所谓的auto Ref
          unwrapping只是语法糖，实质上obj.count仍然是ref类型</mark
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onUpdated } from "vue";
let refObj = ref({ name: "", age: 18 });
let count = ref(1);
const countRefObj = ref({ count });
const countRefArray = ref([count]);
const countRefMap = ref(new Map([["count", count]]));
const obj = ref({ count, countRefObj, countRefArray, countRefMap });
const updateObjCount = () => obj.value.count++;
onUpdated(() =>
  console.log({ obj, countRefObj, count, refObj }, "reactiveUnwrap")
);

const updateObjCount1 = () => obj.value.countRefObj.count++;
// const updateObjCount2 = () => obj.value.countRefArray[0]++; //通过原生类型比如数组的索引或者Map的get(key)获取到的ref不会自动添加.value
const updateObjCount2 = () => obj.value.countRefArray[0].value++;
const updateObjCount3 = () => obj.value.countRefMap.get("count").value++;
</script>

<style lang="scss" scoped></style>
