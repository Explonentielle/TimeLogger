/*
  Warnings:

  - You are about to drop the column `expires` on the `Token` table. All the data in the column will be lost.
  - Added the required column `description` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "expires",
ADD COLUMN     "description" TEXT NOT NULL;
