-- CreateTable
CREATE TABLE "UserEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "affilation" TEXT NOT NULL,
    "maxDownloadCount" INTEGER NOT NULL,
    "validFrom" DATETIME NOT NULL,
    "ValidTo" DATETIME NOT NULL,
    "isActive" BOOLEAN,
    "isAdmin" BOOLEAN
);

-- CreateTable
CREATE TABLE "DownloadEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
