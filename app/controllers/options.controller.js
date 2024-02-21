import * as optionsDatamapper from "../datamappers/options.datamapper.js";

export default {

  getAllSkills: async (_, response) => {
    const skills = await optionsDatamapper.getAllSkills();

    return response.status(200).send(skills);
  },

  getSpells: async (request, response) => {
    const searchKey = request.query.type;
    const searchTerm = request.query.value;

    const spells = await optionsDatamapper.searchSpells(searchKey, searchTerm);

    if (!spells) {
      return response.status(404).json({ error: "Aucun sorts trouvés avec votre recherche" });
    }

    return response.status(200).send(spells);
  },

};