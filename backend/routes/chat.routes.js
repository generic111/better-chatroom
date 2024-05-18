import express from "express";
import { sendChatMessage, getChatMessages, createChat, getChats } from "../controllers/chat/chatroom.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/createChat", protectRoute, createChat);
router.get("/getChats", protectRoute, getChats);

router.post("/send/:id", protectRoute, sendChatMessage);


router.get("/:id", protectRoute, getChatMessages);


export default router;