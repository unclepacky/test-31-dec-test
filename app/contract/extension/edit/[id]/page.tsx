import { editExtension } from "@/actions.ts/actions";
import { ConvertDateToInputCompatible } from "@/app/utills/misc";
import prisma from "@/prisma/client";
import React from "react";

interface Props {
  params: { id: string };
}

export default async function EditExtensionPage({ params }: Props) {
  let defaultStartDate, defaultEndDate;
  const extension = await prisma.contractExtension.findUnique({
    where: {
      id: params.id,
    },
  });

  if (extension?.startDate && extension.endDate) {
    defaultStartDate = ConvertDateToInputCompatible(extension?.startDate);
    defaultEndDate = ConvertDateToInputCompatible(extension?.endDate);
  }

  return (
    <form action={editExtension} className="w-1/2">
      <input type="text" name="id" hidden defaultValue={params.id} />
      <div className="flex gap-5 justify-between">
        <div className="flex flex-col w-1/4">
          <label>Start Date</label>
          <input
            required
            type="date"
            name="startDate"
            defaultValue={defaultStartDate}
            // defaultValue={contract?.startDate.toDateString()}
            className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
          />
        </div>
        <div className="flex flex-col w-1/4">
          <label>End Date</label>
          <input
            required
            type="date"
            name="endDate"
            defaultValue={defaultEndDate}
            className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
          />
        </div>
      </div>
      <div className="flex gap-5 justify-between">
        <label>
          Daily Amount
          <input
            required
            defaultValue={extension?.dailyAmount}
            type="text"
            name="dailyAmount"
            className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
          />
        </label>
        <label>
          Monthly Amount!
          <input
            required
            defaultValue={extension?.monthlyAmount}
            type="text"
            name="monthlyAmount"
            className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
          />
        </label>
      </div>

      <button className="text-center border-2 w-full py-2 bg-amber-400">
        Submit
      </button>
    </form>
  );
}
