-- Revert ohmydnd:v1.6 from pg

BEGIN;

ALTER TABLE "characters"
  ALTER COLUMN "level" DROP DEFAULT;

ALTER TABLE "characters"
  ALTER COLUMN "inspiration" DROP DEFAULT;

ALTER TABLE "characters"
  ALTER COLUMN "armor_class" DROP DEFAULT;

COMMIT;
