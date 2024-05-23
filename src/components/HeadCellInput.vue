<script setup lang="ts">
const inputValue = defineModel<string>();
</script>

<template>
  <div>
    Description
    <input v-model="inputValue" placeholder="Filter" />
  </div>
</template>

<style scoped></style>
