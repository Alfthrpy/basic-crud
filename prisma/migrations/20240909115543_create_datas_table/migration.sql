-- CreateTable
CREATE TABLE "Data" (
    "id" UUID NOT NULL,
    "term" VARCHAR(255) NOT NULL,
    "interpretation" TEXT NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Data_term_key" ON "Data"("term");
