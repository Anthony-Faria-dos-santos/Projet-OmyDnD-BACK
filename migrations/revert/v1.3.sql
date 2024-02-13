-- Revert omydnd:v1.3 from pg

BEGIN;

DROP FUNCTION trigger_set_timestamp;

DROP TRIGGER set_users_timestamp;

DROP TRIGGER set_characters_timestamp;

DROP TRIGGER set_notes_timestamp;


COMMIT;
