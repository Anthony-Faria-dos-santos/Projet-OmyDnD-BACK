import "../helpers/env.load.js";
import classesDatamapper from "../datamappers/classes.datamapper.js";

export default {
  sendClasses: async (_, response) => {
    const classes = await classesDatamapper.getAllClasses();
    response.status(200).send(classes);
  },
};
