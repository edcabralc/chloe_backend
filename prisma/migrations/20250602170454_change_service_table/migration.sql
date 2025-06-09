/*
  Warnings:

  - You are about to drop the column `cafe` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `cofre` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `frigobar` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `lavanderia` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `massagem` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `transfer` on the `services` table. All the data in the column will be lost.
  - Added the required column `description` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "cafe",
DROP COLUMN "cofre",
DROP COLUMN "frigobar",
DROP COLUMN "lavanderia",
DROP COLUMN "massagem",
DROP COLUMN "transfer",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
