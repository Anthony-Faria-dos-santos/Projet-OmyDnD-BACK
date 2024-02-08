import "../helpers/env.load.js";
import characterDatamapper from "../datamappers/characterCreator.datamapper.js";

export default {
  generateCharacterSheet: async (request, response) => {
    const content = request.body;

    const fields = Object.keys(content);
    const values = Object.values(content);

    const placeholders = values.map((_, index) => `$${index + 1}`);

    const result = await characterDatamapper.createCharacter(fields, values, placeholders);

    if (!result) {
      return response.status(500);
    }

    return response.status(200);
  },
};
