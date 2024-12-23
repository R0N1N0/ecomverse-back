/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_address` DROP FOREIGN KEY `user_address_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `user_address` DROP FOREIGN KEY `user_address_id_user_fkey`;

-- DropTable
DROP TABLE `address`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `user_address`;

-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('admin', 'client', 'helpdesk') NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedDate` DATETIME(3) NULL,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `additionalData` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `population` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `predetermined` BOOLEAN NOT NULL DEFAULT false,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `state` VARCHAR(191) NOT NULL DEFAULT 'active',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
