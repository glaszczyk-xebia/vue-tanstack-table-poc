import type { Summary } from "@/types/Summary";
import { faker } from "@faker-js/faker";
import { ref } from "vue";
import { defineStore } from "pinia";

const getSummary = (): Summary => ({
  id: faker.string.uuid(),
  date: faker.date
    .between({ from: "2023-01-01", to: "2023-12-31" })
    .toLocaleDateString("en-GB"),
  description: `${faker.company.name()}, ${faker.location.city()}`,
  amount: faker.finance.amount(),
  subRows: [
    {
      id: faker.string.uuid(),
      department: faker.helpers.arrayElement([
        "Finance",
        "Operations",
        "Sales",
        "Marketing",
        "IT",
        "HR",
        "Legal",
        "Others",
      ]),
      description: faker.lorem.sentence(),
    },
  ],
});

export const useSummaryStore = defineStore("summaryTable", () => {
  const data = ref<Summary[]>(Array.from({ length: 100 }, getSummary));

  return { data };
});
