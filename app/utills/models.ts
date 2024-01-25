import { Contract } from "@prisma/client";

export const ContractColumns: { label: string; value: keyof Contract }[] = [
  { label: "Unit", value: "unitId" },
  { label: "Client", value: "customerId" },
  { label: "Start", value: "startDate" },
  { label: "End", value: "endDate" },
  { label: "Daily", value: "dailyAmount" },
  { label: "Monthly", value: "monthlyAmount" },
  { label: "New Monthly", value: "newMonthlyAmount" },
  { label: "Type", value: "type" },
  { label: "Daily?", value: "isDaily" },
];
