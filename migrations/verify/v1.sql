-- Verify omydnd:v1 on pg

BEGIN;

SELECT * FROM "races" WHERE false;

SELECT * FROM "classes" WHERE false;

SELECT * FROM "backgrounds" WHERE false;

SELECT * FROM "characters" WHERE false;

SELECT * FROM "skills" WHERE false;

SELECT * FROM "characters_has_skills" WHERE false;

SELECT * FROM "notes" WHERE false;



ROLLBACK;
