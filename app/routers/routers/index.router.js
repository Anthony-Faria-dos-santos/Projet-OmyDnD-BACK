import { Router } from "express";
import usersRouter from "./users.router.js";
import characterCRouter from "./character.creator.router.js";
import profileRouter from "./profile.router.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/charactercreator", characterCRouter);
router.use("/profile", profileRouter);

export default router;