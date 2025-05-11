-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "parentId" TEXT;

-- CreateTable
CREATE TABLE "_SharedFolders" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SharedFolders_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SharedFolders_B_index" ON "_SharedFolders"("B");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedFolders" ADD CONSTRAINT "_SharedFolders_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedFolders" ADD CONSTRAINT "_SharedFolders_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
