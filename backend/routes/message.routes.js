import express from "express";
import { sendMessage, getMessages } from "../controllers/chat/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/send/:id", protectRoute, [
    body('message').escape(),
    body('hmac').escape(),
], sendMessage);

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);

export default router;