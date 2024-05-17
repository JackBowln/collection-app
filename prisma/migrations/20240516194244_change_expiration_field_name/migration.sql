/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `VerificationToken` table. All the data in the column will be lost.
  - Added the required column `expires` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_tokenId_fkey";

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "expiresIn",
ADD COLUMN     "expires" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "VerificationToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
