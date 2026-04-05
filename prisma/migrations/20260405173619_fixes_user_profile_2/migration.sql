/*
  Warnings:

  - Made the column `profile_url` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "profile_url" SET NOT NULL,
ALTER COLUMN "profile_url" SET DEFAULT '';
