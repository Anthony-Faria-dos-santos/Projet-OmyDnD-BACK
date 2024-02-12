-- Revert omydnd:v1.5 from pg

BEGIN;

ALTER TABLE "notes"
  ADD COLUMN "title" TEXT;

COMMIT;
