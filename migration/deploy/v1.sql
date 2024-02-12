-- Deploy omydnd:v1 to pg

BEGIN;

CREATE TABLE "races" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "speed" TEXT NOT NULL,
  "strength_bonus" INT NOT NULL DEFAULT 0,
  "dexterity_bonus" INT NOT NULL DEFAULT 0,
  "constitution_bonus" INT NOT NULL DEFAULT 0,
  "inteligence_bonus" INT NOT NULL DEFAULT 0,
  "wisdom_bonus" INT NOT NULL DEFAULT 0,
  "charisma_bonus" INT NOT NULL DEFAULT 0,
  "languages" TEXT NOT NULL DEFAULT 'Aucun',
  "traits" TEXT NOT NULL
);

CREATE TABLE "classes" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "health_dice" TEXT NOT NULL,
  "starting_health" INT NOT NULL,
  "starting_equipment_options" TEXT NOT NULL
);

CREATE TABLE "backgrounds" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "mastered_tools" TEXT NOT NULL DEFAULT 'Aucun',
  "starting_equipment" TEXT NOT NULL,
  "feature" TEXT NOT NULL
);

CREATE TABLE "users" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" TEXT NOT NULL UNIQUE,
  "slug" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "characters" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "users"(id),
  "race_id" INT NOT NULL REFERENCES "races"(id),
  "classe_id" INT NOT NULL REFERENCES "classes"(id),
  "background_id" INT NOT NULL REFERENCES "backgrounds"(id),
  "name" TEXT NOT NULL,
  "level" INT NOT NULL,
  "experience" INT,
  "strength" INT NOT NULL,
  "dexterity" INT NOT NULL,
  "constitution" INT NOT NULL,
  "inteligence" INT NOT NULL,
  "wisdom" INT NOT NULL,
  "charisma" INT NOT NULL,
  "inspiration" INT,
  "mastery_bonus" INT NOT NULL,
  "armor_class" INT NOT NULL,
  "health" INT,
  "bonus_health" INT,
  "alignment" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "skills" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL
);

CREATE TABLE "characters_has_skills" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "character_id" INT NOT NULL REFERENCES "characters"("id") ON DELETE CASCADE,
  "skill_id" INT NOT NULL REFERENCES "skills"("id") ON DELETE CASCADE,
  UNIQUE ("character_id", "skill_id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "notes" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT,
  "content" TEXT NOT NULL,
  "character_id" INT NOT NULL REFERENCES "characters"(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;

