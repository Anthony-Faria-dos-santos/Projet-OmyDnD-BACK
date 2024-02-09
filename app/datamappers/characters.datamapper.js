import client from "../helpers/pg.client.js";
// fonction pour rechercher un user par son email
export async function findAllCharactersByUserId(userId) {
  const query = {
    text: `SELECT * FROM "characters" WHERE user_id=${userId}`,
  };
  const result = await client.query(query);
  return result.rows;
}

export async function findOneByUserId(userId, characterId) {
  const query = {
    text: `SELECT * FROM "characters" WHERE user_id=${userId} AND id=${characterId}`,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updateOne(fields, values, placeholders, characterIdPlaceholder) {
  const query = {
    text: `UPDATE "characters" SET (${fields}) = (${placeholders}) WHERE id=${characterIdPlaceholder} RETURNING *`,
    values,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function deleteOne(characterId) {
  const query = {
    text: `DELETE FROM "characters" WHERE id=${characterId} RETURNING name`
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
