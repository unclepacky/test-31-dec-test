import { addContractExtension } from "@/actions.ts/actions";
import { isFirstExt } from "@/app/utills/misc";
import prisma from "@/prisma/client";
import { ContractExtension } from "@prisma/client";
import React, { HTMLAttributes } from "react";

interface Props {
  params: { id: string };
}

// model ContractExtension {
//   id            String   @id @default(uuid())
//   startDate     DateTime
//   endDate       DateTime
//   isDaily       Boolean  @default(false)
//   dailyAmount   Float    @default(0)
//   monthlyAmount Float    @default(0)
//   createdAt     DateTime @default(now())
//   updatedAt     DateTime @updatedAt

//   contractId String
//   contract   Contract @relation(fields: [contractId], references: [id])
// }

export default async function ContractExtensionWithId(props: Props) {
  let startDate: Date | undefined;

  const contract = await prisma.contract.findUnique({
    where: {
      id: props.params.id,
    },
    include: {
      unit: true,
      customer: true,
    },
  });

  if (contract) {
    // latestContractExtension = await isFirstExt(contract?.id);
    // console.log("isFristExtension", latestContractExtension);
    startDate = await isFirstExt(contract?.id);
  }

  // if (latestContractExtension !== null) {
  //   startDate = contract?.endDate;
  // } else {
  //   startDate = contract?.startDate;
  // }

  const defaultStartDate = startDate?.toISOString().split("T")[0];
  startDate?.setMonth(startDate.getMonth() + 1);
  const defaultEndDate = startDate?.toISOString().split("T")[0];

  return (
    <>
      <div className="flex justify-between w-5/6">
        <div>
          <div>Unit</div>
          <div>{contract?.unit.name} </div>
        </div>
        <div>
          <div>tenant </div>
          <div>{contract?.customer.name} </div>
        </div>
        <div>
          <div>start </div>
          <span>{contract?.startDate.toDateString()} </span>
        </div>
        <div>
          <div>end </div>
          <span>{contract?.endDate.toDateString()} </span>
        </div>
        <div>
          <div>daily? </div>
          <span>{contract?.isDaily ? "Daily" : "Monthly"}</span>
        </div>
        <div>
          <div>d amount </div>
          <span>{contract?.dailyAmount} </span>
        </div>
        <div>
          <div>m amount </div>
          <span>{contract?.monthlyAmount} </span>
        </div>
        <div>
          <div>N amount </div>
          <span>{contract?.newMonthlyAmount} </span>
        </div>
      </div>
      <form action={addContractExtension} className="w-1/2 border-2 ">
        <input
          hidden
          type="text"
          defaultValue={contract?.id}
          name="contractId"
        />
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
        <label className="block">
          <input
            type="checkbox"
            name="isDaily"
            // checked={contract?.isDaily ? true : false}
          />
          Daily Contract
        </label>
        <div className="flex gap-5 justify-between">
          <label>
            Daily Amount
            <input
              required
              defaultValue={contract?.dailyAmount}
              type="text"
              name="dailyAmount"
              className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
            />
          </label>
          <label>
            Monthly Amount!
            <input
              required
              defaultValue={contract?.newMonthlyAmount}
              type="text"
              name="monthlyAmount"
              className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
            />
          </label>
        </div>
        <button type="submit" className="border-2 py-4 px-8 bg-amber-200">
          Create Extension
        </button>
      </form>
      {/* <ListContracts /> */}
    </>
  );
}
