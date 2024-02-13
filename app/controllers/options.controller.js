import * as optionsDatamapper from "../datamappers/options.datamapper.js";

export default {

  getAllSkills: async (_, response) => {
    const skills = await optionsDatamapper.getAllSkills();

    return response.status(200).send(skills);
  },

};