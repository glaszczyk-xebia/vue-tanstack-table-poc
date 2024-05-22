import type { Table } from "@tanstack/vue-table";

export const getColumnSummary = (
  columnKey: string,
  { table }: { table: Table<any> },
) =>
  table
    .getFilteredRowModel()
    .rows.reduce(
      (total, row) => total + parseFloat(row.getValue(columnKey)),
      0,
    );
