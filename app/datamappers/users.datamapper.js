/* eslint-disable quotes */
import client from "../helpers/pg.client.js";

export async function findUserByEmail(email) {
  const query = {
    text: 'SELECT * FROM "users" WHERE email=$1',
    values: [email],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function checkUsersInformations(pseudo, slug, email) {
  const query = {
    text: 'SELECT * FROM "users" WHERE pseudo=$1 OR slug=$2 OR email=$3',
    values: [pseudo, slug, email],
  };
  const result = await client.query(query);
  return result.rows;
}

export async function createUser(pseudo, slug, email, encryptedPassword) {
  const query = {
    text: 'INSERT INTO "users" ("pseudo", "slug", "email", "password") VALUES ($1, $2, $3, $4) RETURNING pseudo, slug, email, created_at',
    values: [pseudo, slug, email, encryptedPassword],
  };
  const result = await client.query(query);
  return result.rows;
}
