-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_tokenId_fkey";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "VerificationToken"("token") ON DELETE CASCADE ON UPDATE CASCADE;
