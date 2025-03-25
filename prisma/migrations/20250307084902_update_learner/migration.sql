/*
  Warnings:

  - A unique constraint covering the columns `[learnerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "learnerId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_learnerId_key" ON "User"("learnerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
