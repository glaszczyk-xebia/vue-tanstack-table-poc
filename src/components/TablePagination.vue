<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { ref } from "vue";

const props = defineProps<{ table: Table<any> }>();
const INITIAL_PAGE_INDEX = 0;
const pageSizes = [10, 20];
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1);

const handleGoToPage = (e: any) => {
  const page = e.target.value ? Number(e.target.value) - 1 : 0;
  goToPageNumber.value = page + 1;
  props.table.setPageIndex(page);
};

const handlePageSizeChange = (e: any) => {
  props.table.setPageSize(Number(e.target.value));
};
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      class="border rounded p-1"
      @click="() => table.setPageIndex(0)"
      :disabled="!table.getCanPreviousPage()"
    >
      «
    </button>
    <button
      class="border rounded p-1"
      @click="() => table.previousPage()"
      :disabled="!table.getCanPreviousPage()"
    >
      ‹
    </button>
    <button
      class="border rounded p-1"
      @click="() => table.nextPage()"
      :disabled="!table.getCanNextPage()"
    >
      ›
    </button>
    <button
      class="border rounded p-1"
      @click="() => table.setPageIndex(table.getPageCount() - 1)"
      :disabled="!table.getCanNextPage()"
    >
      »
    </button>
    <div>
      <span class="flex items-center gap-1">
        <span>Page</span>
        <strong>
          {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </strong>
      </span>
      <span class="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          :value="goToPageNumber"
          @change="handleGoToPage"
          class="border p-1 rounded w-16"
        />
      </span>
      <select
        :value="table.getState().pagination.pageSize"
        @change="handlePageSizeChange"
      >
        <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">
          Show {{ pageSize }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
