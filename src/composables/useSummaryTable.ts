import { getColumnSummary } from "@/utils/getColumnSummary";
import { useSummaryStore } from "@/stores/summaryTable";
import type { Summary } from "@/types/Summary";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export const useSummaryTable = () => {
  const dataStore = useSummaryStore();
  const { data: defaultData } = storeToRefs(dataStore);

  const columnHelper = createColumnHelper<Summary>();

  const data = ref(defaultData.value);
  const summaryFilter = ref("");

  const columns = [
    columnHelper.accessor("date", {
      header: () => "Date",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
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
    state: {
      get globalFilter() {
        return summaryFilter.value;
      },
    },
  });
  console.log(summaryTable.getState());
  return { summaryTable, rerenderSummaryTable, summaryFilter };
};
