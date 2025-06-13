/*
  Warnings:

  - You are about to alter the column `state` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `state` ENUM('active', 'deleted') NOT NULL;
