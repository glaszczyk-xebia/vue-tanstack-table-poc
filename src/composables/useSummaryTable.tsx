import HeadCellInput from "@/components/HeadCellInput.vue";
import { getColumnSummary } from "@/utils/getColumnSummary";
import { useSummaryStore } from "@/stores/summaryTable";
import type { Summary } from "@/types/Summary";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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

  const columns = [
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
  ];

  const rerenderSummaryTable = () => {
    data.value = defaultData.value;
  };

  const summaryTable = useVueTable({
    get data() {
      return data.value;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    },
    onSortingChange: (updaterOrValue) => {
      sorting.value =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting.value)
          : updaterOrValue;
    },
  });
  console.log(summaryTable.getState());
  return {
    summaryTable,
    rerenderSummaryTable,
    summaryFilter,
  };
};
