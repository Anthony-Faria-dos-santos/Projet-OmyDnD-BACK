import { Router } from "express";
// import usersRouter from "./users.router.js";
import characterCreatorRouter from "./character.creator.router.js";
import classesRouter from "./classes.router.js";
import racesRouter from "./races.router.js";
import backgroundsRouter from "./backgrounds.router.js";

const router = Router();

// router.use("/users", usersRouter);
router.use("/charactercreator", characterCreatorRouter);
router.use("/classes", classesRouter);
router.use("/races", racesRouter);
router.use("/backgrounds", backgroundsRouter);

export default router;