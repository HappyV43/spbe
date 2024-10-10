-- DropForeignKey
ALTER TABLE "Allocations" DROP CONSTRAINT "Allocations_agentId_fkey";

-- AlterTable
ALTER TABLE "Allocations" ALTER COLUMN "agentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Allocations" ADD CONSTRAINT "Allocations_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
