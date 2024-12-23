-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_date` DATETIME(3) NULL,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id_address` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `additional_data` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `zip_code` VARCHAR(191) NOT NULL,
    `population` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `predetermined` BOOLEAN NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAddress` (
    `id_user_address` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_address` INTEGER NOT NULL,

    UNIQUE INDEX `UserAddress_id_user_id_address_key`(`id_user`, `id_address`),
    PRIMARY KEY (`id_user_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id_address`) ON DELETE RESTRICT ON UPDATE CASCADE;
