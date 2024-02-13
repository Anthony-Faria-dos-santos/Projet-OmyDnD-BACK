/* eslint-disable quotes */
import client from "../helpers/pg.client.js";

export async function findByPk(id) {
  const query = {
    text: `SELECT * FROM "users"
           WHERE id = $1`,
    values: [id],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function findByPseudo(newPseudo) {
  const query = {
    text: `SELECT * FROM "users"
           WHERE "pseudo" = $1`,
    values: [newPseudo],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function findByMail(email) {
  const query = {
    text: `SELECT * FROM "users"
           WHERE "email" = $1`,
    values: [email],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updateUsername(newPseudo, slug, userId) {
  const query = {
    text: `UPDATE "users"
            SET ("pseudo", "slug") = ($1, $2)
            WHERE "id" = $3 RETURNING pseudo`,
    values: [newPseudo, slug, userId],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updatePassword(encryptedNewPassword, userId) {
  const query = {
    text: `UPDATE "users"
               SET "password" = $1
               WHERE "id" = $2 RETURNING id`,
    values: [encryptedNewPassword, userId],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updateEmail(newEmail, userId) {
  const query = {
    text: `UPDATE "users"
            SET "email" = $1
            WHERE "id" = $2 RETURNING email`,
    values: [newEmail, userId],
  };
  const result = await client.query(query);
  return result.rows[0];
}