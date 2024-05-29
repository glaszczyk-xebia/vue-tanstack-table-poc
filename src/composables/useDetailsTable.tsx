import HeadCellInput from "@/components/HeadCellInput.vue";
import type { PersonDetails } from "@/types/PersonDetails";
import { getColumnSummary } from "@/utils/getColumnSummary";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useDetailsStore } from "@/stores/detailsTable";

export const useDetailsTable = () => {
  const dataStore = useDetailsStore();
  const { data: defaultData } = storeToRefs(dataStore);

  const columnHelper = createColumnHelper<PersonDetails>();

  const data = ref(defaultData.value);
  const detailsFilter = ref("");
  const firstName = ref("");
  const lastName = ref("");
  const group = ref("");
  const filtersComputed = computed(() => {
    const filters = [];
    if (firstName.value)
      filters.push({ id: "firstName", value: firstName.value });
    if (lastName.value) filters.push({ id: "lastName", value: lastName.value });
    if (group.value) filters.push({ id: "group", value: group.value });
    return filters;
  });

  const sorting = ref<SortingState>([]);
  const rowSelection = ref<RowSelectionState>({});
  const columnVisibility = ref({});
  const columnOrder = ref<ColumnOrderState>([]);

  const columns = [
    {
      id: "select",
      header: ({ table }: { table: any }) => {
        return (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          ></input>
        );
      },
      cell: ({ row }: { row: any }) => {
        return (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          ></input>
        );
      },
    },
    columnHelper.accessor("id", {
      header: () => "Id",
      enableSorting: false,
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("accountNo", {
      header: "Account No.",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("group", {
      header: () => <HeadCellInput v-model={group.value}>Group</HeadCellInput>,
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("firstName", {
      header: () => (
        <HeadCellInput v-model={firstName.value}>First name</HeadCellInput>
      ),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("lastName", {
      header: () => (
        <HeadCellInput v-model={lastName.value}>Last name</HeadCellInput>
      ),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      footer: (props) => getColumnSummary("amount", props),
    }),
    columnHelper.accessor("dueDate", {
      header: "Due Date",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("remaining", {
      header: "Remaining",
      footer: (props) => getColumnSummary("remaining", props),
    }),
  ];

  const rerenderDetailsTable = () => {
    data.value = defaultData.value;
  };

  const detailsTable = useVueTable({
    get data() {
      return data.value;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      get globalFilter() {
        return detailsFilter.value;
      },
      get columnFilters() {
        return filtersComputed.value;
      },
      get sorting() {
        return sorting.value;
      },
      get rowSelection() {
        return rowSelection.value;
      },
      get columnVisibility() {
        return columnVisibility.value;
      },
      get columnOrder() {
        return columnOrder.value;
      },
    },
    onSortingChange: (updaterOrValue) => {
      sorting.value =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting.value)
          : updaterOrValue;
    },
    onRowSelectionChange: (updateOrValue) => {
      rowSelection.value =
        typeof updateOrValue === "function"
          ? updateOrValue(rowSelection.value)
          : updateOrValue;
    },
    onColumnOrderChange: (order) => {
      columnOrder.value = order;
    },
  });

  const toggleColumnVisibility = (column: Column<any, any>) => {
    columnVisibility.value = {
      ...columnVisibility.value,
      [column.id]: !column.getIsVisible(),
    };
  };

  const toggleAllColumnsVisibility = () => {
    detailsTable.getAllLeafColumns().forEach((column) => {
      toggleColumnVisibility(column);
    });
  };

  return {
    detailsTable,
    rerenderDetailsTable,
    toggleColumnVisibility,
    toggleAllColumnsVisibility,
    detailsFilter,
  };
};
