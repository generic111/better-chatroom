import express from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";
import {body} from "express-validator";

const router = express.Router();

router.post("/signin", [
    body('username').trim().escape(),
    body('password').trim().escape(),
], signin);

router.post("/signout", signout);

router.post("/signup", [
    body('username').trim().escape(),
    body('password').trim().escape(),
    body('fullName').trim().escape(),
    body('confirmPassword').trim().escape()
], signup);

export default router;