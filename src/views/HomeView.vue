<script setup lang="ts">
import DataTable from "@/components/DataTable.vue";
import SubRowComponent from "@/components/SubRowComponent.vue";
import TablePagination from "@/components/TablePagination.vue";
import { useDetailsTable } from "@/composables/useDetailsTable";
import { useSummaryTable } from "@/composables/useSummaryTable";

const { summaryTable, summaryFilter, rerenderSummaryTable } = useSummaryTable();
const {
  detailsTable,
  detailsFilter,
  rerenderDetailsTable,
  toggleAllColumnsVisibility,
  toggleColumnVisibility,
} = useDetailsTable();
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
        <div class="columnSelectorWrapper">
          <div class="columnGroup">
            <label>
              <input
                type="checkbox"
                :checked="detailsTable.getIsAllColumnsVisible()"
                @input="toggleAllColumnsVisibility"
              />
              Toggle All
            </label>
          </div>
          <div class="columnGroup">
            <div
              v-for="column in detailsTable.getAllLeafColumns()"
              :key="column.id"
              class="columnSelector"
            >
              <label>
                <input
                  type="checkbox"
                  :checked="column.getIsVisible()"
                  @input="toggleColumnVisibility(column)"
                />

                {{ column.id }}
              </label>
            </div>
          </div>
        </div>
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
.columnSelectorWrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.columnGroup {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;
  width: 800px;
}
.columnSelector {
  margin-right: 8px;
  flex-basis: 150px;
}
</style>
