import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { acceptFriendRequest, sendFriendRequest } from "../controllers/friends.controller.js";
import { getFriendsList } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/sendFriendRequsest", protectRoute, sendFriendRequest);
router.post("/acceptFriendRequest", protectRoute, acceptFriendRequest);
router.get("/getFriendsList", protectRoute, getFriendsList);

export default router;