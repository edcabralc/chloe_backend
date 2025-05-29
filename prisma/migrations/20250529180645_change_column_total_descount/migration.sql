/*
  Warnings:

  - You are about to drop the column `totalDescount` on the `reservations` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `reservations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Added the required column `totalDiscount` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "totalDescount",
ADD COLUMN     "totalDiscount" INTEGER NOT NULL,
ALTER COLUMN "total" SET DATA TYPE INTEGER;
