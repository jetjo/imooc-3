<template>
  <div class="box-item">
    <h3>学习使用toRefs使得解构后的值类型属性仍然具备响应性</h3>
    <div>
      name: {{ name }}
      <p>
        <button @click="name = Math.random()">更新name</button>
      </p>
    </div>
    <div>
      age: {{ age }}
      <p>
        <button @click="age = Math.random()">更新age</button>
      </p>
    </div>
    <div>
      price: {{ price }}
      <p>
        <button @click="price.once = Math.random()">更新price.once</button>
      </p>
    </div>
    <div>
      price: {{ price }}
      <p>
        <button @click="price = Math.random()">更新price.value</button>
      </p>
    </div>
    <div>
      price: {{ price }}
      <p>
        <button @click="handleClick">更新price</button>
      </p>
    </div>

    <p>
      <mark
        >toRefs()只能接受proxy类型的参数，然后把proxy对应的target的每一个属性创建一个ref类型的getter/setter属性（名称固定为value）</mark
      >
    </p>
    <p>
      <mark
        >使用const声明ref、reactive、toRefs等的返回值是一个好习惯，以方响应代理被修改</mark
      >
    </p>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
const proxyState = reactive({
  name: "柳如是",
  age: 18,
  price: { once: 3000, oneNight: 8000 },
});
const refState = ref({ name: "柳如是", age: 18 });
// const proxyState = toRefs(reactive({ name: "柳如是", age: 18 }));
// const refState = toRefs(ref({ name: "柳如是", age: 18 }));toRefs不能处理ref类型的参数，虽然不报错，但是行为不正常
// const { name } = toRefs(proxyState);toRefs不能处理ref类型的参数，虽然不报错，但是行为不正常
// const { name, age, price } = toRefs(proxyState);Uncaught TypeError: Assignment to constant variable.
let { name, age, price } = toRefs(proxyState);
// const { age } = toRefs(refState);

function handleClick() {
  price = Math.random().toFixed(5);
}
</script>

<style lang="scss" scoped></style>
