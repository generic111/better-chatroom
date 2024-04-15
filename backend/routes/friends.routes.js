import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendFriendRequest } from "../controllers/friends.controller.js";

const router = express.Router();

router.get("/sendFriendRequsest", protectRoute, sendFriendRequest);

export default router;