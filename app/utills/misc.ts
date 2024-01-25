import prisma from "@/prisma/client";

export async function isFirstExt(id: string) {
  let startDate: Date | undefined;

  const latestContractExtension = await prisma.contractExtension.findFirst({
    where: {
      contractId: id,
    },
    orderBy: {
      createdAt: "desc", // Assuming 'createdAt' is the relevant timestamp
    },
    include: {
      contract: true,
    },
  });

  if (latestContractExtension) {
    startDate = latestContractExtension.endDate;
  } else {
    const contract = await prisma.contract.findUnique({
      where: {
        id: id,
      },
    });
    startDate = contract?.startDate;
  }

  return startDate;
}

export function ConvertDateToInputCompatible(date: Date) {
  return date?.toISOString().split("T")[0];
}
