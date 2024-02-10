import { Router } from "express";
import usersRouter from "./users.router.js";
import characterCRouter from "./character.creator.router.js";
import optionsRouter from "./options.characters.router.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/charactercreator", characterCRouter);
router.use("/options", optionsRouter);

export default router;