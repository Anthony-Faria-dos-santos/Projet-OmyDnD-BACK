/* eslint-disable max-len */
import client from "../helpers/pg.client.js";
// fonction pour rechercher un user par son email
export async function findAllCharactersByUserId(userId) {
  const query = {
    text: `SELECT "id", "name", "level", "status" FROM "characters" WHERE user_id=$1`,
    values: [userId],
  };
  const result = await client.query(query);
  return result.rows;
}
// voir en bas du fichier pour l'explication de la requête
export async function findOneByUserId(userId, characterId) {
  const query = {
    text:
`SELECT
"characters".*,
"races"."name" as "race_name",
"races"."speed" as "race_speed",
"races"."strength_bonus" as "race_strength_bonus",
"races"."dexterity_bonus" as "race_dexterity_bonus",
"races"."constitution_bonus" as "race_constitution_bonus",
"races"."inteligence_bonus" as "race_inteligence_bonus",
"races"."wisdom_bonus" as "race_wisdom_bonus",
"races"."charisma_bonus" as "race_charisma_bonus",
"races"."languages" as "race_languages",
"races"."traits" as "race_traits",
"classes"."name" as "classe_name",
"classes"."health_dice" as "classe_health_dice",
"classes"."starting_health" as "classe_starting_health",
"classes"."starting_equipment_options" as "classe_starting_equipment_options",
"backgrounds"."name" as "background_name",
"backgrounds"."mastered_tools" as "background_mastered_tools",
"backgrounds"."starting_equipment" as "background_starting_equipment",
"backgrounds"."feature" as "background_feature",
array_agg(DISTINCT "characters_has_skills"."skill_id") as "skills",
array_agg(DISTINCT '{' ||"notes"."id" || ',' ||"notes"."content" || '}' ) as "notes"
FROM "characters"
LEFT JOIN "races"
ON "characters"."race_id" = "races"."id"
LEFT JOIN "classes"
ON "characters"."classe_id" = "classes"."id"
LEFT JOIN "backgrounds"
ON "characters"."background_id" = "backgrounds"."id"
LEFT JOIN "characters_has_skills"
ON "characters"."id" = "characters_has_skills"."character_id"
LEFT JOIN "notes"
ON "characters"."id" = "notes"."character_id"
WHERE "characters"."id" = ${characterId}
AND "characters"."user_id"= ${userId}
GROUP BY
"characters"."id",
"races"."name",
"races"."speed",
"races"."strength_bonus",
"races"."dexterity_bonus",
"races"."constitution_bonus",
"races"."inteligence_bonus",
"races"."wisdom_bonus",
"races"."charisma_bonus",
"races"."languages",
"races"."traits",
"classes"."name",
"classes"."health_dice",
"classes"."starting_health",
"classes"."starting_equipment_options",
"backgrounds"."name",
"backgrounds"."mastered_tools",
"backgrounds"."starting_equipment",
"backgrounds"."feature";`,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updateOne(
  fields,
  values,
  placeholders,
  characterIdPlaceholder,
) {
  const query = {
    text: `UPDATE "characters" SET (${fields}) = (${placeholders}) WHERE id=$${characterIdPlaceholder} RETURNING *`,
    values,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function deleteOne(characterId) {
  const query = {
    text: `DELETE FROM "characters" WHERE id=${characterId} RETURNING name`,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function deleteOneUserCharacters(userId) {
  const query = {
    text: `DELETE FROM "characters" WHERE user_id=${userId} RETURNING *`,
  };
  const result = await client.query(query);
  return result.rows;
}

export async function deleteAllCharacterNotes(characterId) {
  const query = {
    text: `DELETE FROM "notes" WHERE character_id=${characterId} RETURNING id`,
  };
  const result = await client.query(query);
  return result.rows;
}

export async function postSkill(characterId, skillId) {
  const query = {
    text: `INSERT INTO "characters_has_skills" ("character_id", "skill_id") VALUES (${characterId}, ${skillId}) RETURNING id`,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function deleteSkill(characterId, skillId) {
  const query = {
    text: `DELETE FROM "characters_has_skills" WHERE "character_id"=${characterId} AND "skill_id" =${skillId} RETURNING id`,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function postNote(fields, values, placeholders) {
  const query = {
    text: `INSERT INTO "notes" (${fields}) VALUES (${placeholders}) RETURNING id`,
    values,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updateNote(updatedContent, noteId, characterId) {
  const query = {
    text: `UPDATE "notes" SET "content" = $1 WHERE "id"=${noteId} AND "character_id"=${characterId} RETURNING id`,
    values: [updatedContent],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function deleteNote(noteId, characterId) {
  const query = {
    text: `DELETE FROM "notes" WHERE "id"=${noteId} AND "character_id"=${characterId} RETURNING id`,
  };
  const result = await client.query(query);
  return result.rows[0];
}
/*
SELECT
  "characters".*,                                                           -> On sélectionne tout les champs de la fiche de personnage
  array_agg(DISTINCT "characters_has_skills"."skill_id") as "skills",       -> On sélectionne les id des skills que possède le personnage rassemblés dans un tableau et on utilise DISTINCT pour éviter les doublons
  array_agg(DISTINCT "notes"."id") as "notes_ids",                          -> On sélectionne les titres des notes que possède le personnage rassemblés dans un tableau et on utilise DISTINCT pour éviter les doublons
  array_agg(DISTINCT "notes"."content") as "notes_contents"                 -> On sélectionne les contenus des notes que possède le personnage rassemblés dans un tableau et on utilise DISTINCT pour éviter les doublons
FROM "characters"
LEFT JOIN "characters_has_skills"                                           -> On joint la table characters_has_skills en left join pour récupèrer toutes les informations de personnages et pas seulement les communes
  ON "characters"."id" = "characters_has_skills"."character_id"             -> La correspondance à utiliser pour le Join
LEFT JOIN "notes"                                                           -> On joint la table notes en left join pour récupèrer toutes les informations de personnages et pas seulement les communes
  ON "characters"."id" = "notes"."character_id"                             -> La correspondance à utiliser pour le Join
WHERE "characters"."id" = ${characterId}                                    -> Une des conditions à remplir
  AND "characters"."user_id"= ${userId}                                     -> L'autre conditions à remplir
GROUP BY
  "characters"."id";`                                                       -> On groupe le tout par l'id du personnage pour n'avoir qu'une seule ligne
*/