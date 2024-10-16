/*
  Warnings:

  - Added the required column `shipTo` to the `Agents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agents" ADD COLUMN     "shipTo" TEXT NOT NULL;
