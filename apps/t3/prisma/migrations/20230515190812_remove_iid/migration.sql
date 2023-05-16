/*
  Warnings:

  - The primary key for the `activities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iid` on the `activities` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_activities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "average_speed" REAL NOT NULL,
    "start_date" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_activities" ("average_speed", "distance", "id", "name", "start_date", "type", "user_id") SELECT "average_speed", "distance", "id", "name", "start_date", "type", "user_id" FROM "activities";
DROP TABLE "activities";
ALTER TABLE "new_activities" RENAME TO "activities";
CREATE UNIQUE INDEX "activities_id_key" ON "activities"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
