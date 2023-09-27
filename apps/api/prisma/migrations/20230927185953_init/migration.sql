/*
  Warnings:

  - You are about to drop the column `onboardingCompleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EducationLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hobby` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PotentialMatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HobbyToProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_InterestToProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_likedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_likingUserId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_userId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_userOneId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_userTwoId_fkey";

-- DropForeignKey
ALTER TABLE "MatchPreference" DROP CONSTRAINT "MatchPreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_matchId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sentByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "PotentialMatch" DROP CONSTRAINT "PotentialMatch_potentialMatchUserId_fkey";

-- DropForeignKey
ALTER TABLE "PotentialMatch" DROP CONSTRAINT "PotentialMatch_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_educationLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_workFieldId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reportedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reporterUserId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewerUserId_fkey";

-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_userId_fkey";

-- DropForeignKey
ALTER TABLE "_HobbyToProfile" DROP CONSTRAINT "_HobbyToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_HobbyToProfile" DROP CONSTRAINT "_HobbyToProfile_B_fkey";

-- DropForeignKey
ALTER TABLE "_InterestToProfile" DROP CONSTRAINT "_InterestToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_InterestToProfile" DROP CONSTRAINT "_InterestToProfile_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "onboardingCompleted";

-- DropTable
DROP TABLE "EducationLevel";

-- DropTable
DROP TABLE "Hobby";

-- DropTable
DROP TABLE "Interest";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "MatchPreference";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "PotentialMatch";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Setting";

-- DropTable
DROP TABLE "WorkField";

-- DropTable
DROP TABLE "_HobbyToProfile";

-- DropTable
DROP TABLE "_InterestToProfile";

-- DropEnum
DROP TYPE "MATCH_STATUS";

-- DropEnum
DROP TYPE "NOTIFICATION_TYPE";

-- DropEnum
DROP TYPE "REPORT_REASON";
