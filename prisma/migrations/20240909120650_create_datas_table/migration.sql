/*
  Warnings:

  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Data";

-- CreateTable
CREATE TABLE "datas" (
    "id" UUID NOT NULL,
    "term" VARCHAR(255) NOT NULL,
    "interpretation" TEXT NOT NULL,

    CONSTRAINT "datas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "datas_term_key" ON "datas"("term");
