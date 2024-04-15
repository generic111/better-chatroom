import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { acceptFriendRequest, sendFriendRequest, getFriendRequests, rejectFriendRequest } from "../controllers/friends.controller.js";
import { getFriendsList } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/sendFriendRequest", protectRoute, sendFriendRequest);
router.post("/acceptFriendRequest", protectRoute, acceptFriendRequest);
router.post("/rejectFriendRequest", protectRoute, rejectFriendRequest);
router.get("/getFriendRequest", protectRoute, getFriendRequests);
router.get("/getFriendsList", protectRoute, getFriendsList);

export default router;