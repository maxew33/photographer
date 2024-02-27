/*
  Warnings:

  - You are about to drop the column `illus` on the `gallery` table. All the data in the column will be lost.
  - Added the required column `path` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gallery` DROP COLUMN `illus`,
    ADD COLUMN `featuredImageId` INTEGER NULL;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `path` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_featuredImageId_fkey` FOREIGN KEY (`featuredImageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
