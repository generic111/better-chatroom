import express from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signin);

router.post("/signout", signout);

router.post("/signup", signup);

export default router;