/*
  Warnings:

  - Added the required column `rol` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `rol` ENUM('admin', 'client', 'helpdesk') NOT NULL;
