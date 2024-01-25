import { ContractColumns } from "@/app/utills/models";
import prisma from "@/prisma/client";
import { Contract } from "@prisma/client";
import Link from "next/link";
import React from "react";
import BtnAutoExtend from "./BtnAutoExtend";

export default async function ListContracts() {
  const contracts = await prisma.contract.findMany({
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
    <div>
      <table className="hidden max-w-full rounded-md text-gray-900 md:table">
        <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
          <tr>
            {ContractColumns.map((col) => (
              <th key={col.label}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-900">
          {contracts.map((contract) => (
            <React.Fragment key={contract.id}>
              <tr className="group">
                <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                  {contract.unit.name}
                </td>
                <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                  {contract.customer.name}
                </td>
                <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                  {contract.startDate.toDateString()}
                </td>
                <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                  {contract.endDate.toDateString()}
                </td>
                <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                  {contract.dailyAmount}
                </td>
                <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                  {contract.monthlyAmount}
                </td>
                <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                  {contract.newMonthlyAmount}
                </td>
                <td className="whitespace-nowrap bg-white px-2 py-3 text-xs">
                  {contract.type}
                </td>
                <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                  {contract.isDaily ? "true" : "false"}
                </td>
                <td className="whitespace-nowrap bg-white px-2 py-3 text-xs">
                  <Link
                    href={`/contract/extension/${contract.id}`}
                    className="border-2 rounded-full py-2 px-4"
                  >
                    Ext
                  </Link>
                </td>
                <td>
                  <BtnAutoExtend id={contract.id} />
                </td>
              </tr>
              {contract.ContractExtension.map((ext) => (
                <tr key={ext.id}>
                  <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                    <div className="pl-5">{ext.startDate.toDateString()}</div>
                  </td>
                  <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                    {ext.endDate.toDateString()}
                  </td>
                  <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                    {ext.dailyAmount}
                  </td>
                  <td className="whitespace-nowrap bg-white px-2 py-3 text-sm">
                    {ext.monthlyAmount}
                  </td>
                  <td className="whitespace-nowrap bg-white px-2 py-3 text-xs">
                    <Link
                      href={`/contract/extension/edit/${ext.id}`}
                      className="border-2 rounded-full py-2 px-4"
                    >
                      edit
                    </Link>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
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
