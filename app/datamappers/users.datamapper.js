/* eslint-disable quotes */
import client from "../helpers/pg.client.js";

export default {
  findUserByEmail: async (email) => {
    const query = {
      text: 'SELECT * FROM "users" WHERE email=$1',
      values: [email],
    };
    const result = await client.query(query);
    return result.rows[0];
  },
};
