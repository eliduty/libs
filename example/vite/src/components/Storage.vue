<script setup lang="ts">
  import { setStorage } from '@eliduty/storage';
  setStorage('abcd', 123123);
  // const stor = new storage({ driver: localStorage, prefix: 'test_' });
  // stor.set('abc', 123);
</script>

<template>
  <div></div>
</template>

<style scoped></style>
