import bcrypt from "bcrypt";

import * as profileDatamapper from "../datamappers/profile.datamapper.js";
import * as userDamapper from "../datamappers/users.datamapper.js";

const saltRounds = process.env.SALT_ROUNDS;

// Méthode pour la modification du pseudo d'un utilisateur

export async function getUser(request, response) {
  const { userId } = request.params;

  const user = await userDamapper.findUserById(userId);
  if (!user) {
    return response.status(403).json({ error: "Utilisateur introuvable" });
  }
  delete user.password;

  return response.status(200).send(user);
}

export async function usernameModification(request, response) {
  // Récupération du pseudo actuel depuis les paramètres de la requête
  const { userId } = request.params;

  // Récupération du nouveau pseudo depuis le corps de la requête
  const newPseudo = request.body.pseudo;

  // Recherche de l'utilisateur dans la base de données par son ID
  const user = await userDamapper.findUserById(userId);
  if (!user) {
    return response.status(403).json({ error: "Utilisateur introuvable" });
  }

  // vérifie si le nouveau pseudo existe déjà
  const databaseComparePseudo = await profileDatamapper.findByPseudo(newPseudo);
  if (databaseComparePseudo) {
    return response.status(403).json({ error: "Ce pseudonyme existe déjà" });
  }

  // Génération du slug pour le nouveau pseudo (converti en minuscules)
  const slug = newPseudo.toLowerCase();

  // Appel du datamapper pour mettre à jour le pseudo dans la base de données
  const pseudoUpdated = await profileDatamapper.updateUsername(newPseudo, slug, userId);
  if (!pseudoUpdated) {
    return response.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de votre pseudo" });
  }
  // Renvoi d'une réponse avec le pseudo mis à jour
  return response.status(200).send(pseudoUpdated);
}

// Méthode pour la modification du mot de passe de l'utilisateur
export async function passwordModification(request, response) {
  // Récupération de l'ID de l'utilisateur et
  // des anciens et nouveaux mots de passe depuis la requête
  const { userId } = request.params;
  const { password, oldPassword } = request.body;

  // Recherche de l'utilisateur dans la base de données par son ID
  const user = await userDamapper.findUserById(userId);
  if (!user) {
    return response.status(403).json({ error: "Utilisateur introuvable" });
  }

  // Vérification si l'ancien mot de passe fourni correspond
  // à celui stocké dans la base de données
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return response.status(403).json({ error: "L'ancien mot de passe est incorrect" });
  }

  const salt = await bcrypt.genSalt(parseInt(saltRounds, 10));

  // Hachage du nouveau mot de passe avec Bcrypt
  const encryptedNewPassword = await bcrypt.hash(password, salt);

  // Vérification si l'ancien et le nouveau mot de passe sont identiques
  const comparedPassword = await bcrypt.compare(encryptedNewPassword, oldPassword);
  if (comparedPassword) {
    return response.status(403).json({ error: "Le nouveau mot de passe ne peut pas être identique à votre ancien mot de passe" });
  }

  // Mise à jour du mot de passe dans la base de données avec le nouveau mot de passe haché
  await profileDatamapper.updatePassword(encryptedNewPassword, userId);

  // Renvoi d'une réponse avec un message de succès
  return response.status(200).send();
}

// Méthode pour la modification de l'email d'un utilisateur
export async function emailModification(request, response) {
  // Récupération de l'email actuel de l'utilisateur depuis les paramètres de la requête
  const { userId } = request.params;

  // Récupération du nouvel email à partir du corps de la requête
  const newEmail = request.body.email;

  // Recherche de l'utilisateur dans la base de données par son email actuel
  const user = await userDamapper.findUserById(userId);
  if (!user) {
    return response.status(403).json({ error: "utilisateur introuvable" });
  }

  // Vérification si le nouvel email existe déjà dans la base de données
  const databaseCompareMail = await userDamapper.findUserByEmail(newEmail);
  if (databaseCompareMail) {
    return response.status(403).json({ error: "Cet email existe déjà" });
  }

  // Mise à jour de l'email dans la base de données avec le nouvel email
  const emailUpdated = await profileDatamapper.updateEmail(newEmail, userId);
  if (!emailUpdated) {
    return response.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de votre pseudo" });
  }

  // Renvoi d'une réponse avec le nouvel email mis à jour
  return response.status(200).send(emailUpdated);
}