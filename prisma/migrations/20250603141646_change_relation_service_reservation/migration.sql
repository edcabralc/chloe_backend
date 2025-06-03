/*
  Warnings:

  - You are about to drop the `ReservationServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReservationServices" DROP CONSTRAINT "ReservationServices_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationServices" DROP CONSTRAINT "ReservationServices_serviceId_fkey";

-- DropTable
DROP TABLE "ReservationServices";

-- CreateTable
CREATE TABLE "_ReservationService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ReservationService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ReservationService_B_index" ON "_ReservationService"("B");

-- AddForeignKey
ALTER TABLE "_ReservationService" ADD CONSTRAINT "_ReservationService_A_fkey" FOREIGN KEY ("A") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationService" ADD CONSTRAINT "_ReservationService_B_fkey" FOREIGN KEY ("B") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
