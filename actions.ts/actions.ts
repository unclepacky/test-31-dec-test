"use server";

import { isFirstExt } from "@/app/utills/misc";
import prisma from "@/prisma/client";
import { TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addUnit(formData: FormData) {
  const unitName = formData.get("unitName") as string;
  const dailyRate = Number(formData.get("dailyRate"));
  const monthlyRate = Number(formData.get("monthlyRate"));

  const newUnit = await prisma.unit.create({
    data: {
      name: unitName,
      dailyRate: dailyRate,
      monthlyRate: monthlyRate,
    },
  });

  revalidatePath("/unit");
}

export async function addCustomer(formData: FormData) {
  const customerName = formData.get("customerName") as string;

  const newUnit = await prisma.customer.create({
    data: {
      name: customerName,
    },
  });

  revalidatePath("/customer");
}
export async function addContract(formData: FormData) {
  const customerId = formData.get("customerId") as string;
  const unitId = formData.get("unitId") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);

  const dailyRate = Number(formData.get("dailyRate"));
  const monthlyRate = Number(formData.get("monthlyRate"));
  const isDailyChecked = formData.get("isDaily") === "on";

  const newContract = await prisma.contract.create({
    data: {
      customerId,
      unitId,
      startDate,
      endDate,
      dailyAmount: dailyRate,
      monthlyAmount: monthlyRate,
      newMonthlyAmount: monthlyRate,
      isDaily: isDailyChecked,
      type: "INACTIVE",
    },
  });

  revalidatePath("/contract/create");
}

export async function addContractExtension(formData: FormData) {
  const contractId = formData.get("contractId") as string;
  const endDate = new Date(formData.get("endDate") as string);
  const startDate = new Date(formData.get("startDate") as string);
  const dailyAmount = Number(formData.get("dailyAmount"));
  const monthlyAmount = Number(formData.get("monthlyAmount"));
  const isDaily = formData.get("isDaily") ? true : false;

  // Using nested write to create a ContractExtension and update Contract
  // const newExtension = await prisma.contract.update({
  //   where: {
  //     id: contractId,
  //   },
  //   data: {
  //     type: "ACTIVE", // Updating the Contract to ACTIVE
  //     newMonthlyAmount: monthlyAmount,
  //     ContractExtension: {
  //       create: {
  //         // Creating a new ContractExtension
  //         // The contractId is automatically set to the updated contract's ID
  //         // In Prisma, when you perform a nested write operation to create a related record (like ContractExtension in this case), the foreign key (in this case, contractId) is automatically set to the ID of the parent record being updated (the Contract in your scenario). This is one of the advantages of using nested writes: it simplifies the code and ensures referential integrity.
  //         startDate,
  //         endDate,
  //         dailyAmount,
  //         monthlyAmount,
  //         isDaily,
  //       },
  //     },
  //     Transaction :{
  //       create :{
  //       amount: monthlyAmount,
  //       type: "RENT",
  //       fromDate: startDate,
  //       toDate: endDate,
  //       }
  //     }
  //   },
  //   // include: {
  //   //   ContractExtension: true, // Optionally include the new ContractExtension in the response
  //   // },
  // });

  const contractExtensions = await prisma.contractExtension.findMany({
    where: {
      contractId: contractId,
    },
    orderBy: {
      startDate: "asc", // or 'desc' for descending order
    },
  });

  // Using $transaction to create a ContractExtension and update Contract
  // const result = await prisma.$transaction([
  //     prisma.contractExtension.create({
  //     data: {
  //       contractId,
  //       endDate,
  //       startDate,
  //       dailyAmount,
  //       monthlyAmount,
  //       isDaily,
  //     },
  //   }),
  //   prisma.contract.update({
  //     where: {
  //       id: contractId,
  //     },
  //     data: {
  //       type: "ACTIVE",
  //       newMonthlyAmount: monthlyAmount,
  //     },
  //   }),

  // ]);

  const updateContract = await prisma.contract.update({
    where: {
      id: contractId,
    },
    data: {
      type: "ACTIVE",
      newMonthlyAmount: monthlyAmount,
    },
  });

  const newExtension = await prisma.contractExtension.create({
    data: {
      contractId,
      endDate,
      startDate,
      dailyAmount,
      monthlyAmount,
      isDaily,
    },
  });

  const newTransaction = await prisma.transaction.create({
    data: {
      contractId: contractId,
      amount: monthlyAmount,
      type: "RENT",
      fromDate: startDate,
      toDate: endDate,
      extensionId: newExtension.id,
    },
  });

  revalidatePath(`/contract/extension/${contractId}`);
  redirect("/contract/create");
}

export async function autoAddExtension(id: string) {
  let startDate: Date | undefined;

  const contract = await prisma.contract.findUnique({
    where: {
      id: id,
    },
  });
  const updatedContract = await prisma.contract.update({
    where: {
      id: id,
    },
    data: {
      type: "ACTIVE",
    },
  });

  if (contract) {
    startDate = await isFirstExt(contract?.id);
  }

  if (startDate) {
    const nextStartDate = new Date(startDate);
    const nextEndDate = new Date(startDate);
    nextEndDate?.setMonth(startDate.getMonth() + 1);
    // Convert both dates to ISO DateTime format
    // const startDateTime = nextStartDate.toISOString();
    // const endDateTime = nextEndDate.toISOString();
    const newExtension = await prisma.contractExtension.create({
      data: {
        contractId: id,
        startDate: nextStartDate,
        endDate: nextEndDate,
        monthlyAmount: contract?.newMonthlyAmount,
        dailyAmount: contract?.dailyAmount,
      },
    });

    const newTransaction = await prisma.transaction.create({
      data: {
        contractId: id,
        amount: contract?.newMonthlyAmount,
        date: contract?.createdAt,
        type: "RENT",
        fromDate: nextStartDate,
        toDate: nextEndDate,
        extensionId: newExtension.id,
      },
    });
  }

  revalidatePath("/contract/create");
}

export async function editExtension(formData: FormData) {
  const id = formData.get("id") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);
  const dailyAmount = Number(formData.get("dailyAmount"));
  const monthlyAmount = Number(formData.get("monthlyAmount"));

  const updatedExtension = await prisma.contractExtension.update({
    where: {
      id: id,
    },
    data: {
      startDate,
      endDate,
      dailyAmount,
      monthlyAmount,
    },
  });

  const relatedContractId = updatedExtension.contractId;

  const updateTransaction = await prisma.transaction.updateMany({
    where: {
      AND: [{ extensionId: id }, { contractId: relatedContractId }],
    },
    data: {
      fromDate: startDate,
      toDate: endDate,
      amount: monthlyAmount,
    },
  });

  revalidatePath(`/contract/extension/edit/${id}`);
  redirect("/contract/create");
}

export async function createTransaction(formData: FormData) {
  const date = new Date(formData.get("date") as string);
  const fromDate = new Date(formData.get("fromDate") as string);
  const toDate = new Date(formData.get("tillDate") as string);
  const fromTime = formData.get("fromTime") as string;
  const tillTime = formData.get("tillTime") as string;
  const contractId = formData.get("contractId") as string;
  const type = formData.get("transaction") as TransactionType;
  let amount = Number(formData.get("amount"));

  if (type === "PAYMENT") {
    amount = amount * -1;
  }

  // Combine date and time for fromTime and tillTime
  const fromDateTime = new Date(
    `${date.toISOString().split("T")[0]}T${fromTime}`
  );
  const tillDateTime = new Date(
    `${date.toISOString().split("T")[0]}T${tillTime}`
  );

  const newTransaction = await prisma.transaction.create({
    data: {
      date,
      fromDate,
      toDate,
      fromTime: fromDateTime,
      tillTime: tillDateTime,
      type,
      amount,
      contractId,
    },
  });

  revalidatePath("/transaction");
}

export async function testSelect(formData: FormData) {
  console.log(formData);
}
