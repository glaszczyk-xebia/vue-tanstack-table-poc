<script setup lang="ts">
import {useDetailsTable} from "@/composables/useDetailsTable";
import {useSummaryTable} from "@/composables/useSummaryTable";

const {summaryTable, rerenderSummaryTable} = useSummaryTable();
const {detailsTable, rerenderDetailsTable} = useDetailsTable()
import {FlexRender} from "@tanstack/vue-table";
</script>

<template>
  <main>
    <div class="table-wrapper">
      <div class="p-2">
        <table>
          <thead>
          <tr
              v-for="headerGroup in summaryTable.getHeaderGroups()"
              :key="headerGroup.id"
          >
            <th
                v-for="header in headerGroup.headers"
                :key="header.id"
                :colSpan="header.colSpan"
            >
              <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
              />
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in summaryTable.getRowModel().rows" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
              />
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr
              v-for="footerGroup in summaryTable.getFooterGroups()"
              :key="footerGroup.id"
          >
            <th
                v-for="header in footerGroup.headers"
                :key="header.id"
                :colSpan="header.colSpan"
            >
              <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.footer"
                  :props="header.getContext()"
              />
            </th>
          </tr>
          </tfoot>
        </table>
        <div class="h-4"/>
        <button @click="rerenderSummaryTable" class="border p-2">Rerender</button>
      </div>

      <div class="p-2">
        <table>
          <thead>
          <tr
              v-for="headerGroup in detailsTable.getHeaderGroups()"
              :key="headerGroup.id"
          >
            <th
                v-for="header in headerGroup.headers"
                :key="header.id"
                :colSpan="header.colSpan"
            >
              <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
              />
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in detailsTable.getRowModel().rows" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
              />
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr
              v-for="footerGroup in detailsTable.getFooterGroups()"
              :key="footerGroup.id"
          >
            <th
                v-for="header in footerGroup.headers"
                :key="header.id"
                :colSpan="header.colSpan"
            >
              <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.footer"
                  :props="header.getContext()"
              />
            </th>
          </tr>
          </tfoot>
        </table>
        <div class="h-4"/>
        <button @click="rerenderDetailsTable" class="border p-2">Rerender</button>
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
