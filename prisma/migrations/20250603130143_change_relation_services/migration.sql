/*
  Warnings:

  - You are about to drop the column `serviceId` on the `reservations` table. All the data in the column will be lost.
  - Made the column `userId` on table `adresses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_serviceId_fkey";

-- AlterTable
ALTER TABLE "adresses" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "serviceId";
