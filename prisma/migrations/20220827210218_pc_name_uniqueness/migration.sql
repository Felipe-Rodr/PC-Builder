/*
  Warnings:

  - A unique constraint covering the columns `[autorId,nome]` on the table `Pc` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Pc_nome_key";

-- CreateIndex
CREATE UNIQUE INDEX "Pc_autorId_nome_key" ON "Pc"("autorId", "nome");
