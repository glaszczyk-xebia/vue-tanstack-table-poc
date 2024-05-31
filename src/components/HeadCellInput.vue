<script setup lang="ts">
const inputValue = defineModel<string>();
</script>

<template>
  <div>
    <slot></slot>
    <input v-model="inputValue" placeholder="Filter" />
  </div>
</template>

<style scoped></style>
