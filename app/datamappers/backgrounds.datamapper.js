import client from "../helpers/pg.client.js";

export default async function getAllBackgrounds() {
  // eslint-disable-next-line quotes
  const query = 'SELECT * FROM "backgrounds";';
  const result = await client.query(query);
  return result.rows;
}