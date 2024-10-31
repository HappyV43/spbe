/*
  Warnings:

  - You are about to drop the column `doNumber` on the `LpgDistributions` table. All the data in the column will be lost.
  - Added the required column `distributionQty` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LpgDistributions_doNumber_key";

-- AlterTable
ALTER TABLE "LpgDistributions" DROP COLUMN "doNumber",
ADD COLUMN     "distributionQty" INTEGER NOT NULL;
