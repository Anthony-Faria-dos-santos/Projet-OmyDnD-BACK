import "../helpers/env.load.js";
import backgroundsDatamapper from "../datamappers/backgrounds.datamapper.js";

export default {
  sendBackgrounds: async (_, response) => {
    const backgrounds = await backgroundsDatamapper.getAllBackgrounds();
    response.status(200).send(backgrounds);
  },
};