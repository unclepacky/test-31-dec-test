import prisma from "@/prisma/client";
import React from "react";

export default async function ContractsPage() {
  const contracts = await prisma.contract.findMany({
    include: {
      ContractExtension: true,
      unit: true,
      customer: true,
    },
  });

  return (
    <main className="p-2 m-4">
      <div>
        <header className="border-2 text-center py-2 my-4 text-3xl">
          <h1>Contracts</h1>
        </header>
        <div className="border-2 py-2 my-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="flex justify-between border-2">
              <span className="border-x-2 py-2 px-4">{contract.type}</span>
              <span className="border-x-2 py-2 px-4">{contract.unit.name}</span>
              <span className="border-x-2 py-2 px-4">
                {contract.customer.name}
              </span>
              <span className="border-x-2 py-2 px-4">
                {contract.startDate.toDateString()}
              </span>
              <span className="border-x-2 py-2 px-4">
                {contract.endDate.toDateString()}
              </span>
              <span className="border-x-2 py-2 px-4">
                {contract.dailyAmount}
              </span>
              <span className="border-x-2 py-2 px-4">
                {contract.monthlyAmount}
              </span>
              <span className="border-x-2 py-2 px-4">
                {contract.newMonthlyAmount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
