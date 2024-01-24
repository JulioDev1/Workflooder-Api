-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Number" (
    "id" TEXT NOT NULL,
    "ddd" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refresh_Token" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Refresh_Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Number_id_key" ON "Number"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Number_userId_key" ON "Number"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_Token_id_key" ON "Refresh_Token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_Token_userId_key" ON "Refresh_Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_id_key" ON "Curriculum"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_userId_key" ON "Curriculum"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_id_key" ON "Technology"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_curriculumId_key" ON "Technology"("curriculumId");

-- AddForeignKey
ALTER TABLE "Number" ADD CONSTRAINT "Number_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refresh_Token" ADD CONSTRAINT "Refresh_Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculum" ADD CONSTRAINT "Curriculum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
