import { addUnit } from "@/actions.ts/actions";
import ListUnits from "@/components/ListUnits";
import prisma from "@/prisma/client";
import React from "react";

export default async function CreateUnit() {
  return (
    <div>
      <form action={addUnit} className="w-1/2 flex gap-5">
        {/* <input hidden type="text" name="unitId" /> */}
        <input
          placeholder="Enter unit name"
          type="text"
          name="unitName"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        />

        <input
          placeholder="Enter unit daily rate"
          type="number"
          name="dailyRate"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        />
        <input
          placeholder="Enter unit monthly rate"
          type="number"
          name="monthlyRate"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        />
        <button type="submit" className="bg-blue-500 bottom-2 py-2 px-4">
          Create
        </button>
      </form>
      <ListUnits />
    </div>
  );
}
