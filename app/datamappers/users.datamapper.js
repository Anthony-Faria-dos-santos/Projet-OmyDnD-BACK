/* eslint-disable quotes */
import client from "../helpers/pg.client.js";
// fonction pour rechercher un user par son email
export async function findUserByEmail(email) {
  const query = {
    text: 'SELECT * FROM "users" WHERE email=$1',
    values: [email],
  };
  const result = await client.query(query);
  return result.rows[0];
}
// fonction pour selectionner tout les users qui qui correspondent au pseudo,slug ou email
export async function checkUsersInformations(pseudo, slug, email) {
  const query = {
    text: 'SELECT * FROM "users" WHERE pseudo=$1 OR slug=$2 OR email=$3',
    values: [pseudo, slug, email],
  };
  const result = await client.query(query);
  return result.rows;
}
// fonction pour ajouter un user à la db
export async function createUser(pseudo, slug, email, encryptedPassword) {
  const query = {
    text: 'INSERT INTO "users" ("pseudo", "slug", "email", "password") VALUES ($1, $2, $3, $4) RETURNING pseudo, slug, email, created_at',
    values: [pseudo, slug, email, encryptedPassword],
  };
  const result = await client.query(query);
  return result.rows;
}

export async function getAllSkills() {
  const query = {
    text: "SELECT * FROM skills",
  };
  const result = await client.query(query);
  return result.rows;
}