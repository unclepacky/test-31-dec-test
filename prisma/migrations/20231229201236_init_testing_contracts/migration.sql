/*
  Warnings:

  - You are about to drop the column `rate` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the `RateHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('INQUIRY', 'ACTIVE', 'INACTIVE', 'RELEASED', 'RESERVED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('RENT', 'CLEANING', 'ELECTRICITY', 'MAINTENANCE_FEE', 'PAYMENT');

-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('VACANT', 'OCCUPIED', 'MAINTENANCE', 'RESERVED');

-- DropForeignKey
ALTER TABLE "RateHistory" DROP CONSTRAINT "RateHistory_unitId_fkey";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "rate",
ADD COLUMN     "dailyRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "monthlyRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "status" "UnitStatus" NOT NULL DEFAULT 'VACANT';

-- DropTable
DROP TABLE "RateHistory";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "type" "ContractType" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDaily" BOOLEAN NOT NULL DEFAULT false,
    "dailyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unitId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_name_key" ON "Customer"("name");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
