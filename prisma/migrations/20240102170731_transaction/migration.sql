/*
  Warnings:

  - The values [RENT] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updateAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('CLEANING', 'ELECTRICITY', 'INTERNET', 'MAINTENANCE_FEE', 'PAYMENT');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "extensionId" TEXT,
ADD COLUMN     "fromDate" TIMESTAMP(3),
ADD COLUMN     "fromTime" TIMESTAMP(3),
ADD COLUMN     "tillTime" TIMESTAMP(3),
ADD COLUMN     "toDate" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "ContractExtension"("id") ON DELETE SET NULL ON UPDATE CASCADE;
