/*
  Warnings:

  - The values [PAID,UNPAID] on the enum `ReservationPayment` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `rooms` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'CLEANING', 'OUT_OF_SERVICE');

-- AlterEnum
BEGIN;
CREATE TYPE "ReservationPayment_new" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
ALTER TABLE "reservations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "reservations" ALTER COLUMN "status" TYPE "ReservationPayment_new" USING ("status"::text::"ReservationPayment_new");
ALTER TYPE "ReservationPayment" RENAME TO "ReservationPayment_old";
ALTER TYPE "ReservationPayment_new" RENAME TO "ReservationPayment";
DROP TYPE "ReservationPayment_old";
ALTER TABLE "reservations" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "status",
ADD COLUMN     "status" "RoomStatus" NOT NULL DEFAULT 'AVAILABLE';

-- DropEnum
DROP TYPE "ReservationStatus";
