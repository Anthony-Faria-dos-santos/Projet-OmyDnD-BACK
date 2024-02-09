import client from "../helpers/pg.client.js";

export default async function createCharacter(fields, values, placeholders) {
  const query = {
    text: `INSERT INTO "characters" (${fields}) VALUES (${placeholders})`,
    values,
  };
  const result = await client.query(query);
  return result.rows;
}