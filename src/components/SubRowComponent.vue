<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  row: {} & {
    subRows: unknown[];
  };
}>();
const subRows = ref(props.row.subRows);
</script>
<template>
  <div>
    <div v-for="(subRow, index) in subRows" :key="index">
      <span>{{ JSON.stringify(subRow.original) }}</span>
    </div>
  </div>
</template>

<style scoped></style>
