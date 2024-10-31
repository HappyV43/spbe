/*
  Warnings:

  - Added the required column `shipTo` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LpgDistributions" ADD COLUMN     "shipTo" TEXT NOT NULL;
