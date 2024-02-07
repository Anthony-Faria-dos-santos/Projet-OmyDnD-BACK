import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../helpers/env.load.js";
import usersDatamapper from "../datamappers/users.datamapper.js";

const JWTSecret = process.env.JWT_SECRET;
const JWTRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION;

export default {

  //  fonction de connexion
  signIn: async (request, response) => {
    const { email, password } = request.body;

    const user = await usersDatamapper.findUserByEmail(email);
    //  vérifie que l'utilisateur existe
    if (!user) {
      return response.status(401);
    }
    //  vérifie que le password encrypté est correct avec la base de donnée
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return response.status(401);
    }
    //  donne un token a l'utilisateur après les vérification
    const token = jwt.sign({ id: user.id }, JWTSecret, {
      expiresIn: JWTRefreshExpiration,
    });

    return response.status(200).send({
      slug: user.slug,
      pseudo: user.pseudo,
      email: user.email,
      accessToken: token,
    });
  },

};
