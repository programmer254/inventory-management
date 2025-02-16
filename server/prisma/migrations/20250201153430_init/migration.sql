/*
  Warnings:

  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `salesId` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the `PuchaseSummary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `saleId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_pkey",
DROP COLUMN "salesId",
ADD COLUMN     "saleId" TEXT NOT NULL,
ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId");

-- DropTable
DROP TABLE "PuchaseSummary";

-- CreateTable
CREATE TABLE "PurchaseSummary" (
    "purchaseSummaryId" TEXT NOT NULL,
    "totalPurchased" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseSummary_pkey" PRIMARY KEY ("purchaseSummaryId")
);
