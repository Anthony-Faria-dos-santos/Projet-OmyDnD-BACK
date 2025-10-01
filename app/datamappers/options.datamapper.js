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

export async function finOneSkillByPk(skillId) {
  const query = {
    text: `SELECT * FROM "skills" WHERE id=${skillId}`,
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function searchSpells(searchKey, searchTerm) {
  // Define a whitelist of allowed columns that can be searched
  const allowedColumns = ['name', 'description', 'type', 'school', 'range', 'duration', 'level'];
  if (!allowedColumns.includes(searchKey)) {
    // Optionally throw, or return empty (or handle as desired)
    throw new Error("Invalid search field");
  }
  const query = {
    text: `SELECT * FROM "spells" WHERE "${searchKey}" LIKE $1 ORDER BY "level" ASC, "name" ASC;`,
    values: [`%${searchTerm}%`],
  };
  const result = await client.query(query);
  return result.rows;
}