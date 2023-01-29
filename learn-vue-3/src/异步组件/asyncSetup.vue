<template>
  <div>async setup</div>
</template>

<script setup>
await new Promise((res, rej) => {
  setTimeout(() => {
    res();
  }, 5000);
});
</script>

<style lang="scss" scoped></style>
