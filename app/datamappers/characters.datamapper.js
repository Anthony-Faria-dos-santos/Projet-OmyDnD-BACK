import client from "../helpers/pg.client.js";
// fonction pour rechercher un user par son email
export async function findAllCharactersByUserId(userId) {
  const query = {
    text: `SELECT * FROM "characters" WHERE user_id=${userId}`,
  };
  const result = await client.query(query);
  return result.rows;
}

export async function findOneByUserId(userSlug, characterId) {
  const query = {
    text: `SELECT * FROM "characters" WHERE user_id=${userId} AND id=${characterId}`,
  };
  const result = await client.query(query);
  return result.rows[0];
}


