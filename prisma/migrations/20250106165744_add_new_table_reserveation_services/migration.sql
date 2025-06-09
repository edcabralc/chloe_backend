-- CreateEnum
CREATE TYPE "ReservationPayment" AS ENUM ('CREATED', 'WAITING', 'PENDING', 'PAID', 'UNPAID');

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_roomId_fkey";

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "status" "ReservationPayment" NOT NULL DEFAULT 'CREATED',
ALTER COLUMN "total" DROP DEFAULT,
ALTER COLUMN "total" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "totalDescount" DROP DEFAULT,
ALTER COLUMN "totalDescount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "ReservationServices" (
    "reservationId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReservationServices_pkey" PRIMARY KEY ("reservationId","serviceId")
);

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationServices" ADD CONSTRAINT "ReservationServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationServices" ADD CONSTRAINT "ReservationServices_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
