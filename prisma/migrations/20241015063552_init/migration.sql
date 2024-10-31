/*
  Warnings:

  - The primary key for the `Agents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CompanyId` on the `Agents` table. All the data in the column will be lost.
  - You are about to drop the column `agentId` on the `Agents` table. All the data in the column will be lost.
  - The `id` column on the `Agents` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `agentId` column on the `Allocations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `companyId` to the `Agents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Agents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agents" DROP CONSTRAINT "Agents_CompanyId_fkey";

-- DropForeignKey
ALTER TABLE "Allocations" DROP CONSTRAINT "Allocations_agentId_fkey";

-- AlterTable
ALTER TABLE "Agents" DROP CONSTRAINT "Agents_pkey",
DROP COLUMN "CompanyId",
DROP COLUMN "agentId",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Agents_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Allocations" DROP COLUMN "agentId",
ADD COLUMN     "agentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Agents" ADD CONSTRAINT "Agents_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocations" ADD CONSTRAINT "Allocations_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
