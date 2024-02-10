import * as charactersDatamapper from "../datamappers/characters.datamapper.js";
import * as usersDatamapper from "../datamappers/users.datamapper.js";

const skillsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default {
  getAll: async (request, response) => {
    const userId = request.params.id;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    }

    const userCharacters = await charactersDatamapper.findAllCharactersByUserId(userId);

    return response.status(200).send(userCharacters);
  },

  getByPk: async (request, response) => {
    const { userId } = request.params;
    const { characterId } = request.params;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    }

    const userCharacter = await charactersDatamapper.findOneByUserId(userId, characterId);

    if (!userCharacter) {
      return response.status(404).json({ error: "Le personnage demandé est introuvable" });
    }

    return response.status(200).send(userCharacter);
  },

  updateOne: async (request, response) => {
    const { userId } = request.params;
    const { characterId } = request.params;
    const character = request.body;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    }

    const userCharacter = await charactersDatamapper.findOneByUserId(userId, characterId);

    if (!userCharacter) {
      return response.status(404).json({ error: "Le personnage demandé est introuvable" });
    }

    const fields = Object.keys(character);
    const values = Object.values(character);

    const placeholders = values.map((_, index) => `$${index + 1}`);
    const characterIdPlaceholder = (values.length) + 1;

    values.push(characterId);

    const updatedCharacter = await charactersDatamapper.updateOne(
      fields,
      values,
      placeholders,
      characterIdPlaceholder,
    );

    if (!updatedCharacter) {
      return response.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de votre personnage" });
    }

    return response.status(200).send(updatedCharacter);
  },

  deleteOneByPk: async (request, response) => {
    const { userId } = request.params;
    const { characterId } = request.params;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    }

    await charactersDatamapper.deleteAllCharacterNotes(characterId);

    const userCharacter = await charactersDatamapper.findOneByUserId(userId, characterId);

    if (!userCharacter) {
      return response.status(404).json({ error: "Le personnage demandé est introuvable" });
    }

    const deletedCharacter = await charactersDatamapper.deleteOne(characterId);

    return response.status(200).send(deletedCharacter);
  },

  postSkill: async (request, response) => {
    const { userId } = request.params;
    const { characterId } = request.params;
    const { skillId } = request.params;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    }

    const userCharacter = await charactersDatamapper.findOneByUserId(userId, characterId);

    if (!userCharacter) {
      return response.status(404).json({ error: "Le personnage demandé est introuvable" });
    }

    const compare = skillsArray.includes(parseInt(skillId, 10));

    if (compare !== true) {
      return response.status(404).json({ error: "La compétence est introuvable" });
    }

    const post = await charactersDatamapper.postSkill(characterId, skillId);

    if (!post) {
      return response.status(500).json({ error: "Une erreur est survenue lors de l'ajout de compétence" });
    }

    return response.status(200).send(post);
  },

  deleteSkill: async (request, response) => {
    const { userId } = request.params;
    const { characterId } = request.params;
    const { skillId } = request.params;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    }

    const userCharacter = await charactersDatamapper.findOneByUserId(userId, characterId);

    if (!userCharacter) {
      return response.status(404).json({ error: "Le personnage demandé est introuvable" });
    }

    const compare = skillsArray.includes(parseInt(skillId, 10));

    if (compare !== true) {
      return response.status(404).json({ error: "La compétence est introuvable" });
    }

    const post = await charactersDatamapper.deleteSkill(characterId, skillId);

    if (!post) {
      return response.status(500).json({ error: "Une erreur est survenue lors de la suppression de compétence" });
    }

    return response.status(200).send(post);
  },

  postNote: async (request, response) => {
    const { userId } = request.params;
    const { characterId } = request.params;
    const note = request.body;

    const user = await usersDatamapper.findUserById(userId);

    if (!user) {
      return response.status(404).json({ error: "Utilisateur introuvable" });
    }

    const userCharacter = await charactersDatamapper.findOneByUserId(userId, characterId);

    if (!userCharacter) {
      return response.status(404).json({ error: "Le personnage demandé est introuvable" });
    }

    const fields = Object.keys(note);
    const values = Object.values(note);

    fields.push("character_id");
    values.push(parseInt(characterId, 10));

    const placeholders = values.map((_, index) => `$${index + 1}`);

    const postNote = await charactersDatamapper.postNote(fields, values, placeholders);

    if (!postNote) {
      return response.status(500).json({ error: "Une erreur s'est produite lors de la création de la note" });
    }

    return response.status(200).send(postNote);
  },
};