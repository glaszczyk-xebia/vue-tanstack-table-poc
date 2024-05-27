import type { SummaryDetails } from "@/types/SummaryDetails";

export type Summary = {
  id: string;
  date: string;
  description: string;
  amount: string;
  subRows?: SummaryDetails[];
};
