/*
  Warnings:

  - You are about to drop the column `address1` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `address` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "address1",
ADD COLUMN     "address" TEXT NOT NULL;
