/*
  Warnings:

  - You are about to drop the column `shipTo` on the `LpgDistributions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LpgDistributions" DROP CONSTRAINT "LpgDistributions_shipTo_fkey";

-- AlterTable
ALTER TABLE "LpgDistributions" DROP COLUMN "shipTo";
