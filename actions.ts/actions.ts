"use server";

import prisma from "@/prisma/client";
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
      isDaily: isDailyChecked,
      type: "INACTIVE",
    },
  });

  revalidatePath("/contract/create");
}

export async function addContractExtension(formData: FormData) {
  console.log(formData);

  const contractId = formData.get("contractId") as string;
  const endDate = new Date(formData.get("endDate") as string);
  const startDate = new Date(formData.get("startDate") as string);
  const dailyAmount = Number(formData.get("dailyAmount"));
  const monthlyAmount = Number(formData.get("monthlyAmount"));
  const isDaily = formData.get("isDaily") ? true : false;

  // Using nested write to create a ContractExtension and update Contract
  const newExtension = await prisma.contract.update({
    where: {
      id: contractId,
    },
    data: {
      type: "ACTIVE", // Updating the Contract to ACTIVE

      ContractExtension: {
        create: {
          // Creating a new ContractExtension
          // The contractId is automatically set to the updated contract's ID
          // In Prisma, when you perform a nested write operation to create a related record (like ContractExtension in this case), the foreign key (in this case, contractId) is automatically set to the ID of the parent record being updated (the Contract in your scenario). This is one of the advantages of using nested writes: it simplifies the code and ensures referential integrity.
          startDate,
          endDate,
          dailyAmount,
          monthlyAmount,
          isDaily,
        },
      },
    },
    // include: {
    //   ContractExtension: true, // Optionally include the new ContractExtension in the response
    // },
  });

  // Using $transaction to create a ContractExtension and update Contract
  // const result = await prisma.$transaction([
  //   prisma.contractExtension.create({
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
  //     },
  //   }),
  // ]);

  revalidatePath(`/contract/extension/${contractId}`);
  redirect("/contract/create");
}
