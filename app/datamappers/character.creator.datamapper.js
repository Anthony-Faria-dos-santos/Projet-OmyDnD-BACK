import client from "../helpers/pg.client.js";

export async function createCharacter(fields, values, placeholders) {
  const query = {
    text: `INSERT INTO "characters" (${fields}) VALUES (${placeholders}) RETURNING id`,
    values,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function getAll(param) {
  const query = {
    text: `SELECT * FROM "${param}"`,
  };
  const result = await client.query(query);
  return result.rows;
}