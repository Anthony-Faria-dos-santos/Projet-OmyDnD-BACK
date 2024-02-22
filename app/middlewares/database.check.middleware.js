/* eslint-disable consistent-return */
import { findOneByUserId } from "../datamappers/characters.datamapper.js";
import { findUserById } from "../datamappers/users.datamapper.js";

const dbCheck = async (request, response, next) => {
  if (request.params && request.params.userId) {
    const { userId } = request.params;

    const user = await findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    }

    if (request.params.characterId) {
      const { characterId } = request.params;

      const userCharacter = await findOneByUserId(userId, characterId);

      if (!userCharacter) {
        return response.status(404).json({ error: "Le personnage demandé est introuvable" });
      }
    }
  }
  next();
};

export default dbCheck;