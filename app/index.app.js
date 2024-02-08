import express from "express";
import cors from "cors";
import router from "./routers/index.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

//* A decommenter si on veux logger toutes les connexions sur notre serveur
// import logger from "./logger/index.logger.js";
// app.use((req, _, next) => {
//   logger.http(`${req.ip} ${req.url}`, { httpStatus: 200 });
//   next();
// });

app.use(express.json());
app.use(cors({ origin: "*" })); //! a gerer plus tard pour le parametrer que pour le front * l'ouvre a tous le monde pour le moment

app.use(router);
app.use(errorMiddleware);

export default app;