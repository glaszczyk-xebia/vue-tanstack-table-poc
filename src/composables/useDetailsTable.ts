import type { PersonDetails } from "@/types/PersonDetails";
import { getColumnSummary } from "@/utils/getColumnSummary";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useDetailsStore } from "@/stores/detailsTable";

export const useDetailsTable = () => {
  const dataStore = useDetailsStore();
  const { data: defaultData } = storeToRefs(dataStore);

  const columnHelper = createColumnHelper<PersonDetails>();

  const data = ref(defaultData.value);
  const detailsFilter = ref("");

  const columns = [
    columnHelper.accessor("id", {
      header: () => "Id",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("accountNo", {
      header: "Account No.",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("group", {
      header: "Group",
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
    state: {
      get globalFilter() {
        return detailsFilter.value;
      },
    },
  });

  return { detailsTable, rerenderDetailsTable, detailsFilter };
};
