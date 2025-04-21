/*
  Warnings:

  - You are about to drop the column `title` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Folder` table. All the data in the column will be lost.
  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
