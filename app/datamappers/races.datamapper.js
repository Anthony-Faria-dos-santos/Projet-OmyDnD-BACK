import client from "../helpers/pg.client.js";

export default async function getAllRaces() {
  // eslint-disable-next-line quotes
  const query = 'SELECT * FROM "races";';
  const result = await client.query(query);
  return result.rows;
}
