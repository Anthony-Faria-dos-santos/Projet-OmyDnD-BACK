/* eslint-disable quotes */
import client from "../helpers/pg.client.js";

export async function findByPk(id) {
  const query = {
    text: `SELECT "id" FROM "users"
           WHERE id = $1`,
    values: [id],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function findByMail(email) {
  const query = {
    text: `SELECT "email" FROM "users"
           WHERE "email" = $1`,
    values: [email],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updateUsername(newPseudo, slug, pseudo) {
  const query = {
    text: `UPDATE "users"
            SET "pseudo" = $1, 
            "slug" = $2
            WHERE "pseudo" = $3`,
    values: [newPseudo, slug, pseudo],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updatePassword(encryptedNewPassword, userId) {
  const query = {
    text: `UPDATE "users"
               SET "password" = $1
               WHERE "id" = $2`,
    values: [encryptedNewPassword, userId],
  };
  const result = await client.query(query);
  return result.rows[0];
}

export async function updateEmail(newEmail, email) {
  const query = {
    text: `UPDATE "users"
            SET "email" = $1
            WHERE "email" = $2`,
    values: [newEmail, email],
  };
  const result = await client.query(query);
  return result.rows[0];
}