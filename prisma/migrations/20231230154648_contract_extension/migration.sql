-- CreateTable
CREATE TABLE "ContractExtension" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isDaily" BOOLEAN NOT NULL DEFAULT false,
    "dailyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "ContractExtension_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContractExtension" ADD CONSTRAINT "ContractExtension_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
