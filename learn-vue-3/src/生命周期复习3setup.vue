<template>
  <div class="box">
    确认在setup钩子前发生了什么，即父组件的beforeMount钩子应该是在子组件的setup钩子前发生的，并且setup钩子发生前，属性就是可用的。
  </div>
</template>

<script setup>
console.log("父组件beforeMount钩子后打印");
</script>

<style lang="scss" scoped>
.box {
  text-align: left;
  border: 1px solid gold;
  margin: 10px;
}
</style>
