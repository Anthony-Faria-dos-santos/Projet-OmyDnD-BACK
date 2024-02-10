-- Revert omydnd:v1.2 from pg

BEGIN;

ALTER TABLE "characters"
  DROP COLUMN "status";

COMMIT;
