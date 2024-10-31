/*
  Warnings:

  - The primary key for the `RawData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DO_NUMBER` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `DO_STATUS` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `GI_DATE` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `MATERIAL` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `MATERIAL_NAME` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `NO` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `PLANNED_GI_DATE` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `PLANT` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `QUANTITY` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `SHIP_TO` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `SHIP_TO_NAME` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `UOM` on the `RawData` table. All the data in the column will be lost.
  - Added the required column `doNumber` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doStatus` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialName` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plannedGiDate` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plant` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipTo` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipToName` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uom` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Made the column `bpe` on table `RawData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RawData" DROP CONSTRAINT "RawData_pkey",
DROP COLUMN "DO_NUMBER",
DROP COLUMN "DO_STATUS",
DROP COLUMN "GI_DATE",
DROP COLUMN "MATERIAL",
DROP COLUMN "MATERIAL_NAME",
DROP COLUMN "NO",
DROP COLUMN "PLANNED_GI_DATE",
DROP COLUMN "PLANT",
DROP COLUMN "QUANTITY",
DROP COLUMN "SHIP_TO",
DROP COLUMN "SHIP_TO_NAME",
DROP COLUMN "UOM",
ADD COLUMN     "doNumber" TEXT NOT NULL,
ADD COLUMN     "doStatus" TEXT NOT NULL,
ADD COLUMN     "giDate" TIMESTAMP(3),
ADD COLUMN     "material" TEXT NOT NULL,
ADD COLUMN     "materialName" TEXT NOT NULL,
ADD COLUMN     "no" INTEGER NOT NULL,
ADD COLUMN     "plannedGiDate" TEXT NOT NULL,
ADD COLUMN     "plant" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "shipTo" TEXT NOT NULL,
ADD COLUMN     "shipToName" TEXT NOT NULL,
ADD COLUMN     "uom" TEXT NOT NULL,
ALTER COLUMN "bpe" SET NOT NULL,
ADD CONSTRAINT "RawData_pkey" PRIMARY KEY ("no");
