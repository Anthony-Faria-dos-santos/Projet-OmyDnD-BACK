-- Deploy ohmydnd:v1.6 to pg

BEGIN;

CREATE TABLE "spells" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "range" TEXT NOT NULL,
  "components" TEXT NOT NULL,
  "material" TEXT NOT NULL DEFAULT 'Aucun',
  "ritual" TEXT NOT NULL,
  "duration" TEXT NOT NULL,
  "concentration" TEXT NOT NULL,
  "casting_time" TEXT NOT NULL,
  "level" TEXT NOT NULL,
  "school" TEXT NOT NULL,
  "class" TEXT NOT NULL,
  "higher_level" TEXT DEFAULT 'Aucun',
  "archetype" TEXT DEFAULT 'Aucun',
  "domains" TEXT DEFAULT 'Aucun',
  "oaths" TEXT DEFAULT 'Aucun',
  "circles" TEXT DEFAULT 'Aucun',
  "patrons" TEXT DEFAULT 'Aucun'
);

COMMIT;
