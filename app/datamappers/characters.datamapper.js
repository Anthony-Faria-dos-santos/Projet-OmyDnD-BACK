import client from "../helpers/pg.client.js";
// fonction pour rechercher un user par son email
export async function findAllCharactersByUserId(userId) {
  const query = {
    text: `SELECT "name", "level", "status" FROM "characters" WHERE user_id=${userId}`,
  };
  const result = await client.query(query);
  return result.rows;
}

export async function findOneByUserId(userId, characterId) {
  const query = {
    text: `SELECT
            "characters".*,
            array_agg(DISTINCT "characters_has_skills"."skill_id") as "skills",
            array_agg(DISTINCT "notes"."title") as "notes_titles",
            array_agg(DISTINCT "notes"."content") as "notes_contents"
          FROM "characters"
          LEFT JOIN "characters_has_skills"
            ON "characters"."id" = "characters_has_skills"."character_id"
          LEFT JOIN "notes"
            ON "characters"."id" = "notes"."character_id"
          WHERE "characters"."id" = ${characterId}
            AND "characters"."user_id"= ${userId}
          GROUP BY
          "characters"."id";`,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updateOne(fields, values, placeholders, characterIdPlaceholder) {
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