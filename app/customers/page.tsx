import { addCustomer, addUnit } from "@/actions.ts/actions";
import ListCustomers from "@/components/ListCustomers";
import ListUnits from "@/components/ListUnits";
import prisma from "@/prisma/client";
import React from "react";

export default async function CustomersPage() {
  return (
    <div>
      <form action={addCustomer} className="w-1/2 flex gap-5">
        <input
          placeholder="Enter customer name"
          type="text"
          name="customerName"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        />

        <button type="submit" className="bg-blue-500 bottom-2 py-2 px-4">
          Create
        </button>
      </form>
      <ListCustomers />
    </div>
  );
}
