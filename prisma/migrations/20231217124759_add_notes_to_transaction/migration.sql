/*
  Warnings:

  - The values [SAFE] on the enum `transactionTypes` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `notes` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "transactionTypes_new" AS ENUM ('EARNING', 'EXPENSE');
ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "transactionTypes_new" USING ("type"::text::"transactionTypes_new");
ALTER TYPE "transactionTypes" RENAME TO "transactionTypes_old";
ALTER TYPE "transactionTypes_new" RENAME TO "transactionTypes";
DROP TYPE "transactionTypes_old";
COMMIT;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "notes" TEXT NOT NULL;
