-- Verify ohmydnd:v1.6 on pg

BEGIN;

SELECT * FROM "spells" WHERE false;

ROLLBACK;
