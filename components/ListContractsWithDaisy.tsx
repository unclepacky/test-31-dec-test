import { ContractColumns } from "@/app/utills/models";
import prisma from "@/prisma/client";
import { Contract } from "@prisma/client";
import Link from "next/link";
import React from "react";
import BtnAutoExtend from "./BtnAutoExtend";

export default async function ListContractsWithDaisy() {
  const contracts = await prisma.contract.findMany({
    // where: {
    //   id: "4ccd344c-16ec-4cf9-8ca3-71e4a0484280",
    // },
    include: {
      unit: true,
      ContractExtension: {
        orderBy: {
          startDate: "asc",
        },
      },
      customer: true,
    },
    orderBy: {
      unit: {
        name: "asc",
      },
    },
  });

  return (
    <div className="m-3">
      <div className="max-w-full  text-gray-900">
        <div className="HEADER flex bg-gray-50 text-left text-sm font-normal rounded-md">
          {ContractColumns.map((col) => {
            if (col.label === "Daily?" || col.label === "Daily") return;
            return (
              <div key={col.label} className="flex-1">
                {col.label}
              </div>
            );
          })}
          <div className="flex-1"></div>
          <div className="flex-1"></div>
        </div>
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="collapse bg-base-200 collapse-arrow"
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="CONTENT flex text-left text-sm font-normal rounded-md">
                <div className="bg-white text-xs my-3 flex-1">
                  {contract?.unit.name}
                </div>
                <div className="bg-white text-xs my-3 flex-1">
                  {contract?.customer.name}
                </div>
                <div className="bg-white text-xs my-3 flex-1">
                  {contract?.startDate.toDateString()}
                </div>
                <div className="bg-white text-xs my-3 flex-1">
                  {contract?.endDate.toDateString()}
                </div>
                <div className="bg-white text-xs my-3 flex-1">
                  {contract?.monthlyAmount}
                </div>
                <div className="bg-white text-xs my-3 flex-1">
                  {contract?.newMonthlyAmount}
                </div>
                <div className="bg-white text-xs my-3 flex-1">
                  {contract?.type}
                </div>
                <div className="bg-white text-xs my-3 flex-1 z-50">
                  <Link
                    className="border-2 rounded-full py-2 px-4"
                    href={`/contract/extension/${contract?.id}`}
                  >
                    Ext
                  </Link>
                </div>
                <div className="bg-white text-xs flex-1 z-50">
                  <BtnAutoExtend id={contract?.id ?? ""} />
                </div>
              </div>
            </div>
            <div className="collapse-content">
              {contract?.ContractExtension.map((ext) => (
                <div key={ext.id} className="flex">
                  <div className="flex-1">{ext.startDate.toDateString()}</div>
                  <div className="flex-1"> {ext.endDate.toDateString()}</div>
                  <div className="flex-1"> {ext.dailyAmount}</div>
                  <div className="flex-1"> {ext.monthlyAmount}</div>
                  <div className="flex-1">
                    <Link
                      href={`/contract/extension/edit/${ext.id}`}
                      className="border-2 rounded-full py-2 px-4"
                    >
                      edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

// const usersWithPosts = await prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       posts: {
//         select: {
//           title: true,
//         },
//       },
//     },
//   });

{
  /* <div className="collapse bg-base-200">
<input type="checkbox" />
<div className="collapse-title text-xl font-medium">
  Click me to show/hide content
</div>
<div className="collapse-content">
  <p>hello</p>
  <p>hello</p>
  <p>hello</p>
</div>
</div> */
}
