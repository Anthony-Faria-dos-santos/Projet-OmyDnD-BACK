-- Revert ohmydnd:v1.6 from pg

BEGIN;

DROP TABLE "spells";

COMMIT;
