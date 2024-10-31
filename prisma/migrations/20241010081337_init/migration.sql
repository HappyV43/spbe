/*
  Warnings:

  - Added the required column `agentId` to the `Agents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agents" ADD COLUMN     "agentId" TEXT NOT NULL;
