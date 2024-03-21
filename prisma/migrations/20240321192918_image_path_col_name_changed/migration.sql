/*
  Warnings:

  - You are about to drop the column `path` on the `image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `path`,
    ADD COLUMN `imagePath` VARCHAR(191) NULL;
