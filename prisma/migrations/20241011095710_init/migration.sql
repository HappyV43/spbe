/*
  Warnings:

  - You are about to drop the column `devlieryNumber` on the `LpgDistributions` table. All the data in the column will be lost.
  - Added the required column `deliveryNumber` to the `LpgDistributions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LpgDistributions" DROP COLUMN "devlieryNumber",
ADD COLUMN     "deliveryNumber" TEXT NOT NULL;
