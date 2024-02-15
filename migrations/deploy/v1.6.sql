-- Deploy ohmydnd:v1.6 to pg

BEGIN;

ALTER TABLE "characters"
  ALTER COLUMN "level" SET DEFAULT 1;

ALTER TABLE "characters"
  ALTER COLUMN "inspiration" SET DEFAULT 0;

ALTER TABLE "characters"
  ALTER COLUMN "armor_class" SET DEFAULT 10;

COMMIT;
