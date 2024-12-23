/*
  Warnings:

  - You are about to drop the `useraddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `useraddress` DROP FOREIGN KEY `UserAddress_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `useraddress` DROP FOREIGN KEY `UserAddress_id_user_fkey`;

-- DropTable
DROP TABLE `useraddress`;

-- CreateTable
CREATE TABLE `user_address` (
    `id_user_address` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_address` INTEGER NOT NULL,

    UNIQUE INDEX `user_address_id_user_id_address_key`(`id_user`, `id_address`),
    PRIMARY KEY (`id_user_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `user_address_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `user_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id_address`) ON DELETE RESTRICT ON UPDATE CASCADE;
