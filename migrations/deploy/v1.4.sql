-- Deploy omydnd:v1.4 to pg

BEGIN;

ALTER TABLE "notes"
  DROP COLUMN "character_id";

ALTER TABLE "notes"
  ADD COLUMN "character_id" INT NOT NULL REFERENCES "characters"("id") ON DELETE CASCADE;

COMMIT;
