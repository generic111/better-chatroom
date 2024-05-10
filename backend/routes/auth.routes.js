import express from "express";
import { signup, signin, signout, muteUser, unmuteUser } from "../controllers/chat/auth.controller.js";
import {body} from "express-validator";
import protectRoute from "../middleware/protectRoute.js";

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

router.post("/muteUser", protectRoute, muteUser);
router.post("/unmuteUser", protectRoute, unmuteUser);

export default router;