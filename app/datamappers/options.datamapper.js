/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import client from "../helpers/pg.client.js";

export async function getAllSkills() {
  const query = {
    text: 'SELECT id FROM "skills"',
  };
  const result = await client.query(query);
  return result.rows;
}