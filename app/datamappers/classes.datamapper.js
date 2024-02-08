import client from "../helpers/pg.client.js";

export default async function getAllClasses() {
  // eslint-disable-next-line quotes
  const query = 'SELECT * FROM "classes";';
  const result = await client.query(query);
  return result.rows;
}
