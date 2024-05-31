<script setup lang="ts">
import type { Summary } from "@/types/Summary";
import type { Row } from "@tanstack/vue-table";
import { ref } from "vue";

const props = defineProps<{
  data: Row<Summary>;
}>();
const subRows = ref(props.data.original.subRows);
</script>

<template>
  <div>
    <div v-for="(subRow, index) in subRows" :key="index">
      <div class="nestedRow">
        <div class="id">{{ subRow.id }}</div>
        <div class="department">{{ subRow.department }}</div>
        <div class="description">{{ subRow.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nestedRow {
  padding: 8px;
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: lavender;
}
.id {
  font-size: 0.8em;
}
.department {
  font-weight: bold;
}
.description {
  margin-top: 4px;
}
</style>
