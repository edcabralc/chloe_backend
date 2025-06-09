/*
  Warnings:

  - You are about to drop the column `Cafe` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `Cofre` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `Frigobar` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `Lavanderia` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `Massagem` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `Transfer` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "Cafe",
DROP COLUMN "Cofre",
DROP COLUMN "Frigobar",
DROP COLUMN "Lavanderia",
DROP COLUMN "Massagem",
DROP COLUMN "Transfer",
ADD COLUMN     "cafe" INTEGER,
ADD COLUMN     "cofre" INTEGER,
ADD COLUMN     "frigobar" INTEGER,
ADD COLUMN     "lavanderia" INTEGER,
ADD COLUMN     "massagem" INTEGER,
ADD COLUMN     "transfer" INTEGER;
