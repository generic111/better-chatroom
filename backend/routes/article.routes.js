import express from "express";
import { createArticle, getArticles, deleteArticle, editArticle } from "../controllers/knowledgeRepo/article.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { comment, getComments, deleteComment } from "../controllers/knowledgeRepo/comment.controller.js";

const router = express.Router();

router.post("/createArticle", protectRoute, createArticle);
router.post("/comment", protectRoute, comment);

router.get("/getArticles", protectRoute, getArticles);
router.get("/getComments/:id", protectRoute, getComments);

router.post("/deleteArticle", protectRoute, deleteArticle);
router.post("/deleteComment", protectRoute, deleteComment);

router.post("/editArticle", protectRoute, editArticle);

export default router;