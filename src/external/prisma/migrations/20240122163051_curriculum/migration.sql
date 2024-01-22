-- CreateTable
CREATE TABLE "Curriculum" (
    "id" TEXT NOT NULL,
    "technology" TEXT[],
    "description" TEXT NOT NULL,
    "number" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_id_key" ON "Curriculum"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_userId_key" ON "Curriculum"("userId");

-- AddForeignKey
ALTER TABLE "Curriculum" ADD CONSTRAINT "Curriculum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
