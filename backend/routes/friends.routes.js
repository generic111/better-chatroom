import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { acceptFriendRequest, sendFriendRequest, getFriendRequests, rejectFriendRequest, deleteFriend } from "../controllers/chat/friends.controller.js";
import { getFriendsList } from "../controllers/user.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/sendFriendRequest", protectRoute, [
    body('receiverName').trim().escape(),
], sendFriendRequest);

router.post("/deleteFriend", protectRoute, [
    body('receiverName').trim().escape(),
], deleteFriend);

router.post("/acceptFriendRequest", protectRoute, acceptFriendRequest);
router.post("/rejectFriendRequest", protectRoute, rejectFriendRequest);
router.get("/getFriendRequest", protectRoute, getFriendRequests);
router.get("/getFriendsList", protectRoute, getFriendsList);

export default router;