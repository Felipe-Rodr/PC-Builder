CREATE EXTENSION citext;
-- CreateTable
CREATE TABLE "Pc" (
    "id" SERIAL NOT NULL,
    "partes" TEXT[],
    "autorId" TEXT NOT NULL,

    CONSTRAINT "Pc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" CITEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
