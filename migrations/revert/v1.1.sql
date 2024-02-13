-- Revert omydnd:v1.1 from pg

BEGIN;

ALTER TABLE "characters"
  ADD COLUMN "mastery_bonus" INT NOT NULL DEFAULT 0;

COMMIT;
