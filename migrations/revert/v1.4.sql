-- Revert omydnd:v1.4 from pg

BEGIN;

ALTER TABLE "notes"
  DROP COLUMN "character_id";

ALTER TABLE "notes"
  ADD COLUMN "character_id" INT NOT NULL REFERENCES "characters"("id");

COMMIT;
