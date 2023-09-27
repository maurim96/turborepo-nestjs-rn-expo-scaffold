-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'OTHER');

-- CreateEnum
CREATE TYPE "MATCH_STATUS" AS ENUM ('ACCEPTED', 'DECLINED', 'CANCELED');

-- CreateEnum
CREATE TYPE "NOTIFICATION_TYPE" AS ENUM ('NEW_MATCH', 'NEW_MESSAGE', 'NEW_LIKE', 'NEW_REVIEW', 'NEW_REPORT');

-- CreateEnum
CREATE TYPE "REPORT_REASON" AS ENUM ('INAPPROPRIATE_CONTENT', 'INAPPROPRIATE_BEHAVIOR', 'SPAM', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "gender" "GENDER",
    "dateOfBirth" TIMESTAMP(3),
    "profilePicture" TEXT,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "minDistance" INTEGER NOT NULL,
    "maxDistance" INTEGER NOT NULL,
    "preferredGender" "GENDER" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotentialMatch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "potentialMatchUserId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PotentialMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "likingUserId" TEXT NOT NULL,
    "likedUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "userOneId" TEXT NOT NULL,
    "userTwoId" TEXT NOT NULL,
    "matched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MATCH_STATUS" NOT NULL,
    "lastActivityAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "educationLevelId" TEXT NOT NULL,
    "workFieldId" TEXT NOT NULL,
    "photos" TEXT[],
    "bio" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationLevel" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "EducationLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkField" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "WorkField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "NOTIFICATION_TYPE" "NOTIFICATION_TYPE" NOT NULL,
    "referenceId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inAppNotifications" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reporterUserId" TEXT NOT NULL,
    "reportedUserId" TEXT NOT NULL,
    "reportReason" "REPORT_REASON" NOT NULL,
    "reportDetails" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "reviewerUserId" TEXT NOT NULL,
    "reviewedUserId" TEXT NOT NULL,
    "reviewText" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HobbyToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InterestToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MatchPreference_userId_key" ON "MatchPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_userId_key" ON "Location"("userId");

-- CreateIndex
CREATE INDEX "potential_match_index" ON "PotentialMatch"("userId", "potentialMatchUserId");

-- CreateIndex
CREATE INDEX "like_index" ON "Like"("likingUserId", "likedUserId");

-- CreateIndex
CREATE INDEX "match_index" ON "Match"("userOneId", "userTwoId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_userId_key" ON "Setting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_HobbyToProfile_AB_unique" ON "_HobbyToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_HobbyToProfile_B_index" ON "_HobbyToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InterestToProfile_AB_unique" ON "_InterestToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_InterestToProfile_B_index" ON "_InterestToProfile"("B");

-- AddForeignKey
ALTER TABLE "MatchPreference" ADD CONSTRAINT "MatchPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialMatch" ADD CONSTRAINT "PotentialMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialMatch" ADD CONSTRAINT "PotentialMatch_potentialMatchUserId_fkey" FOREIGN KEY ("potentialMatchUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likingUserId_fkey" FOREIGN KEY ("likingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likedUserId_fkey" FOREIGN KEY ("likedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "EducationLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_workFieldId_fkey" FOREIGN KEY ("workFieldId") REFERENCES "WorkField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterUserId_fkey" FOREIGN KEY ("reporterUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerUserId_fkey" FOREIGN KEY ("reviewerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewedUserId_fkey" FOREIGN KEY ("reviewedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sentByUserId_fkey" FOREIGN KEY ("sentByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HobbyToProfile" ADD CONSTRAINT "_HobbyToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Hobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HobbyToProfile" ADD CONSTRAINT "_HobbyToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToProfile" ADD CONSTRAINT "_InterestToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToProfile" ADD CONSTRAINT "_InterestToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
