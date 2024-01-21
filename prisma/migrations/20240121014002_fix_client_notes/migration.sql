/*
  Warnings:

  - The `notes` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `pet_id` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pet_id_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "notes",
ADD COLUMN     "notes" TEXT[];

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "pet_id";
