import type {PersonDetails} from "@/types/PersonDetails";
import {
  createColumnHelper,
  getCoreRowModel,
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

  const columns = [
    columnHelper.group({
      header: "Name",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("firstName", {
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor((row) => row.lastName, {
          id: "lastName",
          cell: (info) => info.getValue(),
          header: () => "Last Name",
          footer: (props) => props.column.id,
        }),
      ],
    }),
    columnHelper.group({
      header: "Info",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("age", {
          header: () => "Age",
          footer: (props) => props.column.id,
        }),
        columnHelper.group({
          header: "More Info",
          columns: [
            columnHelper.accessor("visits", {
              header: () => "Visits",
              footer: (props) => props.column.id,
            }),
            columnHelper.accessor("status", {
              header: "Status",
              footer: (props) => props.column.id,
            }),
            columnHelper.accessor("progress", {
              header: "Profile Progress",
              footer: (props) => props.column.id,
            }),
          ],
        }),
      ],
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
  });

  return { detailsTable, rerenderDetailsTable };
};
