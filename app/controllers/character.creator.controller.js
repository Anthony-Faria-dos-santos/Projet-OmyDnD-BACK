
import * as characterDatamapper from "../datamappers/character.creator.datamapper.js";

export default {
  createCharacter: async (request, response) => {
    const content = request.body;

    // On récupère les champs et les valeurs de l'objet dans deux tableaux différents
    const fields = Object.keys(content);
    const values = Object.values(content);
    // On crée nos $1, $2, etc..
    const placeholders = values.map((_, index) => `$${index + 1}`);

    const result = await characterDatamapper.createCharacter(fields, values, placeholders);

    if (!result) {
      return response.status(500).json({ error: "Une erreur est survenue lors de la création du personnage" });
    }

    return response.status(200).send(result);
  },

  sendRaces: async (_, response) => {
    const races = await characterDatamapper.getAll("races");
    response.status(200).send(races);
  },

  sendBackgrounds: async (_, response) => {
    const backgrounds = await characterDatamapper.getAll("backgrounds");
    response.status(200).send(backgrounds);
  },

  sendClasses: async (_, response) => {
    const classes = await characterDatamapper.getAll("classes");
    response.status(200).send(classes);
  },

};