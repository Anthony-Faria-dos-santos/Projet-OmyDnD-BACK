-- Deploy omydnd:v1.3 to pg

BEGIN;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_users_timestamp
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_characters_timestamp
BEFORE UPDATE ON "characters"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_notes_timestamp
BEFORE UPDATE ON "notes"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

COMMIT;
