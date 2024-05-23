<script setup lang="ts">
import { FlexRender, type Table } from "@tanstack/vue-table";
type DataTableProps = {
  table: Table<any>;
};
const props = defineProps<DataTableProps>();
</script>

<template>
  <table>
    <thead>
      <tr
        v-for="headerGroup in props.table.getHeaderGroups()"
        :key="headerGroup.id"
      >
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :colSpan="header.colSpan"
          @click="header.column.getToggleSortingHandler()?.($event)"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
          {{
            { asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string]
          }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.table.getRowModel().rows" :key="row.id">
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
        v-for="footerGroup in props.table.getFooterGroups()"
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
</template>

<style scoped></style>
