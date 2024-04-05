/*
  Warnings:

  - Added the required column `picturePath` to the `Picinfos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `picinfos` ADD COLUMN `picturePath` VARCHAR(191) NOT NULL;
