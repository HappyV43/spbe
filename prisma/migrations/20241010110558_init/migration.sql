/*
  Warnings:

  - Added the required column `agentId` to the `Allocations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Allocations" DROP CONSTRAINT "Allocations_shipTo_fkey";

-- AlterTable
ALTER TABLE "Allocations" ADD COLUMN     "agentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Allocations" ADD CONSTRAINT "Allocations_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
