import bcrypt from "bcrypt";
import "../helpers/env.load.js";
import * as profileDatamapper from "../datamappers/profile.datamapper.js";
import * as schema from "../schemas/profile.schemas.js";

const saltRounds = process.env.SALT_ROUNDS;

export default {
  usernameModification: async (request, response) => {
    const { pseudo } = request.params;
    const { newPseudo } = request.body;

    if (pseudo === newPseudo) { return response.status(401).json({ error: "Le pseudo est le même, veuillez recommencer" }); }
    // const validationPseudo = schema.validate({ pseudo: newPseudo });

    /* if (validationPseudo.error) {
      return response.status(400).json({ error: validationPseudo.error.message });
    } */
    const slug = newPseudo.toLowerCase();
    const pseudoUpdated = await profileDatamapper.updateUsername(newPseudo, pseudo, slug);
    return response.status(200).send(pseudoUpdated);
  },

};