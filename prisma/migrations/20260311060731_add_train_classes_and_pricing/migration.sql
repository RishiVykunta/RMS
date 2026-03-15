/*
  Warnings:

  - You are about to drop the column `totalSeats` on the `Train` table. All the data in the column will be lost.
  - Added the required column `trainClassId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TrainClassType" AS ENUM ('SLEEPER', 'AC_3_TIER', 'AC_2_TIER', 'AC_FIRST_CLASS');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "trainClassId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Train" DROP COLUMN "totalSeats";

-- CreateTable
CREATE TABLE "TrainClass" (
    "id" TEXT NOT NULL,
    "trainId" TEXT NOT NULL,
    "type" "TrainClassType" NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "TrainClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrainClass_trainId_type_key" ON "TrainClass"("trainId", "type");

-- AddForeignKey
ALTER TABLE "TrainClass" ADD CONSTRAINT "TrainClass_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_trainClassId_fkey" FOREIGN KEY ("trainClassId") REFERENCES "TrainClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
