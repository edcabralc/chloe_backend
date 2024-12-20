-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_serviceId_fkey";

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "cupom" DROP NOT NULL,
ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
