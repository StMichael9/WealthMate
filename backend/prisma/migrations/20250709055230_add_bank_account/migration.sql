-- CreateTable
CREATE TABLE "bankAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "plaidAccountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mask" TEXT,
    "subtype" TEXT,
    "type" TEXT,
    CONSTRAINT "bankAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "bankAccount_plaidAccountId_key" ON "bankAccount"("plaidAccountId");
