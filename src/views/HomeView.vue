<script setup lang="ts">
import DataTable from "@/components/DataTable.vue";
import SubRowComponent from "@/components/SubRowComponent.vue";
import TablePagination from "@/components/TablePagination.vue";
import { useDetailsTable } from "@/composables/useDetailsTable";
import { useSummaryTable } from "@/composables/useSummaryTable";

const { summaryTable, summaryFilter, rerenderSummaryTable } = useSummaryTable();
const { detailsTable, detailsFilter, rerenderDetailsTable } = useDetailsTable();
</script>

<template>
  <main>
    <div class="table-wrapper">
      <div class="p-2">
        <input v-model="summaryFilter" placeholder="Filter summary table" />
        <DataTable :table="summaryTable">
          <template #nested-row="{ data }">
            <SubRowComponent :data="data" />
          </template>
        </DataTable>
        <div class="h-4" />
        <button @click="rerenderSummaryTable" class="border p-2">
          Rerender
        </button>
        <TablePagination :table="summaryTable" />
      </div>

      <div class="p-2">
        <input v-model="detailsFilter" placeholder="Filter details table" />
        <DataTable :table="detailsTable" />
        <div class="h-4" />
        <button @click="rerenderDetailsTable" class="border p-2">
          Rerender
        </button>
      </div>
    </div>
  </main>
</template>

<style>
html {
  font-family: sans-serif;
  font-size: 14px;
}

table {
  border: 1px solid lightgray;
}

tbody {
  border-bottom: 1px solid lightgray;
}

th {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
}

tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
}
.table-wrapper {
  display: flex;
}
</style>
