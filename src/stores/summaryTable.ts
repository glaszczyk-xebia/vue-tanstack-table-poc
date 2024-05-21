import type { Summary } from "@/types/Summary";
import { ref } from "vue";
import { defineStore } from "pinia";

function getRandomDateIn2023() {
  const start = new Date(2023, 0, 1); // Start of 2023
  const end = new Date(2024, 0, 1); // Start of 2024
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB');
}

export const useSummaryStore = defineStore("summaryTable", () => {
  const data = ref<Summary[]>([
    {
      date: getRandomDateIn2023(),
      description: "Acme Corp, New York",
      amount: 100,
    },
    {
      date: getRandomDateIn2023(),
      description: "Umbrella Corporation, Raccoon City",
      amount: 100,
    },
    {
      date: getRandomDateIn2023(),
      description: "Initech, Chicago",
      amount: 100,
    },
  ]);

  return { data };
});
