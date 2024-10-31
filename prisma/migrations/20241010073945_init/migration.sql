/*
  Warnings:

  - The primary key for the `Agents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addresses` on the `Agents` table. All the data in the column will be lost.
  - You are about to drop the column `associatedCompanyId` on the `Agents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Agents` table. All the data in the column will be lost.
  - You are about to drop the column `addresses` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `agentsId` on the `LpgDistributions` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `LpgDistributions` table. All the data in the column will be lost.
  - You are about to drop the column `transactionNumber` on the `LpgDistributions` table. All the data in the column will be lost.
  - Added the required column `CompanyId` to the `Agents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Agents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentName` to the `Agents` table without a default value. This is not possible if the table is not empty.
  - Made the column `fax` on table `Agents` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `address` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bpeNumber` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `devlieryNumber` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverName` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `giDate` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipTo` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agents" DROP CONSTRAINT "Agents_associatedCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "Allocations" DROP CONSTRAINT "Allocations_shipTo_fkey";

-- DropForeignKey
ALTER TABLE "LpgDistributions" DROP CONSTRAINT "LpgDistributions_agentsId_fkey";

-- AlterTable
ALTER TABLE "Agents" DROP CONSTRAINT "Agents_pkey",
DROP COLUMN "addresses",
DROP COLUMN "associatedCompanyId",
DROP COLUMN "name",
ADD COLUMN     "CompanyId" INTEGER NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "agentName" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fax" SET NOT NULL,
ADD CONSTRAINT "Agents_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Allocations" ALTER COLUMN "shipTo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "addresses",
DROP COLUMN "company",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LpgDistributions" DROP COLUMN "agentsId",
DROP COLUMN "date",
DROP COLUMN "transactionNumber",
ADD COLUMN     "bocor" INTEGER,
ADD COLUMN     "bpeNumber" TEXT NOT NULL,
ADD COLUMN     "devlieryNumber" TEXT NOT NULL,
ADD COLUMN     "driverName" TEXT NOT NULL,
ADD COLUMN     "giDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isiKurang" INTEGER,
ADD COLUMN     "shipTo" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Agents" ADD CONSTRAINT "Agents_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocations" ADD CONSTRAINT "Allocations_shipTo_fkey" FOREIGN KEY ("shipTo") REFERENCES "Agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LpgDistributions" ADD CONSTRAINT "LpgDistributions_shipTo_fkey" FOREIGN KEY ("shipTo") REFERENCES "Agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
