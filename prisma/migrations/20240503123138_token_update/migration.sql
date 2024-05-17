/*
  Warnings:

  - You are about to drop the column `access_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token_expires_in` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `VerificationToken` table. All the data in the column will be lost.
  - Added the required column `tokenId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresIn` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "access_token",
DROP COLUMN "expires_at",
DROP COLUMN "refresh_token",
DROP COLUMN "refresh_token_expires_in",
DROP COLUMN "token_type",
ADD COLUMN     "tokenId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "expires",
ADD COLUMN     "expiresIn" INTEGER NOT NULL,
ADD COLUMN     "isValid" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "token_type" "TokenType" NOT NULL DEFAULT 'API';

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "VerificationToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
