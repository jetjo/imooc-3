<template>
  <div class="box-item">
    <h3>学习使用toRef解构单个属性，并使其保持响应性</h3>
    <div>
      refName: {{ refName }}
      <button @click="refName = Math.random().toFixed(5)">更改refname</button>
    </div>
    <div>
      refPrice: {{ refPrice }}
      <button @click="refPrice = Math.random().toFixed(5)">更改refPrice</button>
      <button @click="refPrice.oneNight = Math.random().toFixed(5)">
        更改refPrice.value.oneNight
      </button>
    </div>
    <div>
      proxyName: {{ proxyName }}
      <button @click="proxyName = Math.random().toFixed(5)">
        更改proxyName
      </button>
    </div>
    <div>
      proxyPrice: {{ proxyPrice }}
      <button @click="proxyPrice = Math.random().toFixed(5)">
        更改proxyPrice
      </button>
      <button @click="proxyPrice.oneNight = Math.random().toFixed(5)">
        更改proxyPrice.oneNight
      </button>
    </div>
    proxyState: {{ proxyState }}
  </div>
</template>

<script setup>
import { reactive, ref, toRef } from "vue";

const proxyState = reactive({
  name: "柳如是",
  price: { once: 3000, oneNight: 8000 },
});
const refState = ref({ name: "柳如是", price: { once: 3000, oneNight: 8000 } });
const refName = toRef(refState, "name");
const proxyName = toRef(proxyState, "name");
const refPrice = toRef(refState, "price");
const proxyPrice = toRef(proxyState, "price");
</script>

<style lang="scss" scoped></style>
