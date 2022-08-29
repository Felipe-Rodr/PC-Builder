/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Pc` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nome` on table `Pc` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pc" ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "nome" SET DATA TYPE CITEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Pc_nome_key" ON "Pc"("nome");
