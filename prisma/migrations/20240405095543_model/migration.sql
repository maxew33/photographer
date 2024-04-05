/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `imageinfos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `image`;

-- DropTable
DROP TABLE `imageinfos`;

-- CreateTable
CREATE TABLE `PictureInfos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `place` VARCHAR(191) NULL,
    `pictureId` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
