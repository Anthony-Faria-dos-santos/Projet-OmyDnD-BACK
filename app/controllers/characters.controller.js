import charactersDatamapper from "../datamappers/characters.datamapper.js";
import usersDatamapper from "../datamappers/users.datamapper.js";

export default {
  getAll: async (request, response) => {
    const userId = request.params.id;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    };

    const userCharacters =  await charactersDatamapper.findAllCharactersByUserId(userId);

    return response.status(200).send(userCharacters);

  },

  getByPk: async (request, response) => {
    const userId = request.params.userId;
    const characterId = request.params.characterId;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    };

    const userCharacter = await charactersDatamapper.findOneByUserId(userId, characterId);

    if (!userCharacter) {
      return response.status(404).json({ error: "Le personnage demandé est introuvable" });
    }

    return response.status(200).send(userCharacter);
  },

  updateOne: async (request, response) => {
    const userId = request.params.userId;
    const characterId = request.params.characterId;
    const character = request.body;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    };

    const userCharacter = await charactersDatamapper.findOneByUserId(userId, characterId);

    if (!userCharacter) {
      return response.status(404).json({ error: "Le personnage demandé est introuvable" });
    }

    const fields = Object.keys(character);
    const values = Object.keys(character);

    const placeholders = values.map((_, index) => `$${index + 1}`);
    const characterIdPlaceholder = (values.length) + 1;

    values.push(characterId);

    const updatedCharacter = await charactersDatamapper.updateOne(fields, values, placeholders, characterIdPlaceholder);

    if (!updatedCharacter) {
      return response.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de votre personnage" });
    }

    return response.status(200).send(updatedCharacter);
  }


}