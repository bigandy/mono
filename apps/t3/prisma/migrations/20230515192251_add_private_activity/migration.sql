/*
  Warnings:

  - Added the required column `private` to the `activities` table without a default value. This is not possible if the table is not empty.

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
    "private" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_activities" ("average_speed", "distance", "id", "name", "start_date", "type", "user_id") SELECT "average_speed", "distance", "id", "name", "start_date", "type", "user_id" FROM "activities";
DROP TABLE "activities";
ALTER TABLE "new_activities" RENAME TO "activities";
CREATE UNIQUE INDEX "activities_id_key" ON "activities"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
