-- Deploy omydnd:v1.2 to pg

BEGIN;


ALTER TABLE "characters"
  ADD COLUMN "status" TEXT NOT NULL DEFAULT 'Vivant';

COMMIT;
