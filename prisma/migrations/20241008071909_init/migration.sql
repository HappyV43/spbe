/*
  Warnings:

  - The primary key for the `RawData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `doNumber` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `doStatus` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `giDate` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `materialName` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `no` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `plannedGiDate` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `plant` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `shipTo` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `shipToName` on the `RawData` table. All the data in the column will be lost.
  - You are about to drop the column `uom` on the `RawData` table. All the data in the column will be lost.
  - Added the required column `DO_NUMBER` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DO_STATUS` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MATERIAL` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MATERIAL_NAME` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NO` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PLANNED_GI_DATE` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PLANT` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `QUANTITY` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SHIP_TO` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SHIP_TO_NAME` to the `RawData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UOM` to the `RawData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RawData" DROP CONSTRAINT "RawData_pkey",
DROP COLUMN "doNumber",
DROP COLUMN "doStatus",
DROP COLUMN "giDate",
DROP COLUMN "material",
DROP COLUMN "materialName",
DROP COLUMN "no",
DROP COLUMN "plannedGiDate",
DROP COLUMN "plant",
DROP COLUMN "quantity",
DROP COLUMN "shipTo",
DROP COLUMN "shipToName",
DROP COLUMN "uom",
ADD COLUMN     "DO_NUMBER" TEXT NOT NULL,
ADD COLUMN     "DO_STATUS" TEXT NOT NULL,
ADD COLUMN     "GI_DATE" TIMESTAMP(3),
ADD COLUMN     "MATERIAL" TEXT NOT NULL,
ADD COLUMN     "MATERIAL_NAME" TEXT NOT NULL,
ADD COLUMN     "NO" INTEGER NOT NULL,
ADD COLUMN     "PLANNED_GI_DATE" TEXT NOT NULL,
ADD COLUMN     "PLANT" INTEGER NOT NULL,
ADD COLUMN     "QUANTITY" INTEGER NOT NULL,
ADD COLUMN     "SHIP_TO" TEXT NOT NULL,
ADD COLUMN     "SHIP_TO_NAME" TEXT NOT NULL,
ADD COLUMN     "UOM" TEXT NOT NULL,
ALTER COLUMN "bpe" DROP NOT NULL,
ADD CONSTRAINT "RawData_pkey" PRIMARY KEY ("NO");
