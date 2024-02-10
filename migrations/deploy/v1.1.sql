-- Deploy omydnd:v1.1 to pg

BEGIN;

ALTER TABLE "characters"
  DROP COLUMN "mastery_bonus";

COMMIT;