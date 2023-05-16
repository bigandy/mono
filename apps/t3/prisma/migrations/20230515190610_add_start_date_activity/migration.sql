/*
  Warnings:

  - Added the required column `start_date` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_activities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "average_speed" REAL NOT NULL,
    "start_date" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_activities" ("average_speed", "distance", "id", "iid", "name", "type", "user_id") SELECT "average_speed", "distance", "id", "iid", "name", "type", "user_id" FROM "activities";
DROP TABLE "activities";
ALTER TABLE "new_activities" RENAME TO "activities";
CREATE UNIQUE INDEX "activities_iid_key" ON "activities"("iid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
