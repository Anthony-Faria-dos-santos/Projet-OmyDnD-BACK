import express from "express";
import indexRouter from "./routers/index.router.js";

const router = express.Router();

router.use("/api", indexRouter);

export default router;