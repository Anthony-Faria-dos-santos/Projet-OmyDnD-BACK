import "../helpers/env.load.js";
import racesDatamapper from "../datamappers/races.datamapper.js";

export default {
  sendRaces: async (_, response) => {
    const races = await racesDatamapper.getAllRaces();
    response.status(200).send(races);
  },
};
