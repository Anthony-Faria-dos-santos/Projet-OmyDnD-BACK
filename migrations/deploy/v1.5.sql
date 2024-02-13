-- Deploy omydnd:v1.5 to pg

BEGIN;

ALTER TABLE "notes"
  DROP COLUMN "title";

COMMIT;
