/*
  Warnings:

  - You are about to drop the column `time` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'RENT';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "time";
