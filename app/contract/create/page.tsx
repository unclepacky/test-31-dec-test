import { addContract } from "@/actions.ts/actions";
import ListContracts from "@/components/ListContracts";
import prisma from "@/prisma/client";
import { ContractType } from "@prisma/client";
import React from "react";

export default async function CreateContractPage() {
  const currentDate = new Date();
  const defaultStartDate = currentDate.toISOString().split("T")[0];

  currentDate.setMonth(currentDate.getMonth() + 1);
  const defaultEndDate = currentDate.toISOString().split("T")[0];

  const units = await prisma.unit.findMany({
    where: {
      status: "VACANT",
    },
  });
  const customers = await prisma.customer.findMany();

  return (
    <>
      <form action={addContract} className="w-1/2 border-2 ">
        <div className="flex justify-between">
          <select
            required
            name="unitId"
            defaultValue=""
            className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
          >
            <option value="" disabled>
              Select Unit ...
            </option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
          <select
            required
            name="customerId"
            defaultValue=""
            className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
          >
            <option value="" disabled>
              Select Customer ...
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col w-1/4">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              defaultValue={defaultStartDate}
              className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
            />
          </div>
          <div className="flex flex-col w-1/4">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              defaultValue={defaultEndDate}
              className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
            />
          </div>
        </div>
        <label>
          <input type="checkbox" name="isDaily" />
          Daily Contract
        </label>
        <div className="flex justify-between">
          <input
            placeholder="Daily amount"
            type="text"
            name="dailyRate"
            className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
          />
          <input
            placeholder="Monthly amount"
            type="text"
            name="monthlyRate"
            className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
          />
        </div>
        <button type="submit" className="border-2 py-4 px-8 bg-amber-200">
          Create Contract
        </button>
      </form>
      <ListContracts />
    </>
  );
}

// const currentDate = new Date();
// currentDate.setMonth(currentDate.getMonth() + 1);
// const endDate = currentDate.toISOString().split("T")[0];
