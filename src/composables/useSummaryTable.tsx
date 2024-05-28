import HeadCellInput from "@/components/HeadCellInput.vue";
import { useSummaryStore } from "@/stores/summaryTable";
import type { Summary } from "@/types/Summary";
import { getColumnSummary } from "@/utils/getColumnSummary";
import {
  createColumnHelper,
  ExpandedState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useVueTable,
} from "@tanstack/vue-table";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

export const useSummaryTable = () => {
  const dataStore = useSummaryStore();
  const { data: defaultData } = storeToRefs(dataStore);

  const columnHelper = createColumnHelper<Summary>();

  const data = ref(defaultData.value);
  const summaryFilter = ref("");
  const descriptionFilter = ref("");
  const filtersComputed = computed(() => {
    const filters = [];
    if (descriptionFilter.value)
      filters.push({ id: "description", value: descriptionFilter.value });
    return filters;
  });

  const sorting = ref<SortingState>([]);
  const rowSelection = ref<RowSelectionState>({});
  const expanded = ref<ExpandedState>({});
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
    columnHelper.accessor("date", {
      header: () => "Date",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("description", {
      header: () => (
        <HeadCellInput v-model={descriptionFilter.value}></HeadCellInput>
      ),
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
      filterFn: "includesString",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => info.getValue(),
      footer: (props) => getColumnSummary("amount", props),
    }),
    {
      id: "expand",
      header: "Expand",
      cell: ({ row }: { row: any }) => {
        return (
          <button
            disabled={!row.getCanExpand()}
            onClick={row.getToggleExpandedHandler()}
            style={{ cursor: "pointer" }}
          >
            {row.getIsExpanded() ? "-" : "+"}
          </button>
        );
      },
    },
  ];

  const rerenderSummaryTable = () => {
    data.value = defaultData.value;
  };

  const summaryTable = useVueTable({
    get data() {
      return data.value;
    },
    columns,
    enableRowSelection: true,
    enableExpanding: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSubRows: (row) => row.subRows,
    state: {
      get globalFilter() {
        return summaryFilter.value;
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
      get expanded() {
        return expanded.value;
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
    onExpandedChange: (updateOrValue) => {
      expanded.value =
        typeof updateOrValue === "function"
          ? updateOrValue(expanded.value)
          : updateOrValue;
    },
  });

  return {
    summaryTable,
    rerenderSummaryTable,
    summaryFilter,
  };
};
