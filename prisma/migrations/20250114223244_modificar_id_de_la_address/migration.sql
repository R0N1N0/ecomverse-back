/*
  Warnings:

  - The primary key for the `addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `id_address` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_address` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_address`);
