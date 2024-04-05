/*
  Warnings:

  - You are about to drop the `_gallerytoimage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_gallerytoimage` DROP FOREIGN KEY `_GalleryToImage_A_fkey`;

-- DropForeignKey
ALTER TABLE `_gallerytoimage` DROP FOREIGN KEY `_GalleryToImage_B_fkey`;

-- DropForeignKey
ALTER TABLE `gallery` DROP FOREIGN KEY `Gallery_featuredImageId_fkey`;

-- DropTable
DROP TABLE `_gallerytoimage`;

-- CreateTable
CREATE TABLE `ImageInfos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `place` VARCHAR(191) NULL,
    `pictureId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GalleryToPicture` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GalleryToPicture_AB_unique`(`A`, `B`),
    INDEX `_GalleryToPicture_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_featuredImageId_fkey` FOREIGN KEY (`featuredImageId`) REFERENCES `Picture`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GalleryToPicture` ADD CONSTRAINT `_GalleryToPicture_A_fkey` FOREIGN KEY (`A`) REFERENCES `Gallery`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GalleryToPicture` ADD CONSTRAINT `_GalleryToPicture_B_fkey` FOREIGN KEY (`B`) REFERENCES `Picture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
