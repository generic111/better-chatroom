import User from "../../models/user.model.js";
import Article from "../../models/article.model.js";
import Comment from "../../models/comment.model.js";


export const createArticle = async (req, res) => {
    try {
        
        const {username, title, content} = req.body;

        const user = await User.findOne({username});

        const newArticle = await Article({
            authorName: username,
            authorId: user._id,
            title: title,
            content: content,
        
        });

        if (newArticle) {
            await newArticle.save();
            res.status(201).json(newArticle);
        }

        else {
            res.status(400).json({error: "Article not created"});
        }

    } catch (error) {
        console.log("error creating article up", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};

export const getArticles = async (req, res) => {
    try {
        // Returns all the articles

        const articles = await Article.find({}).populate("commentList");
        res.status(200).json(articles);
    } catch (error) {
        console.log("error getting articles", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};

export const deleteArticle = async (req, res) => {
    try {
        const {articleId} = req.body;
        
        const article = await Article.findById(articleId);

        for (let i = 0; i < article.commentList.length; i++) {
            await Comment.deleteOne({_id: article.commentList[i]});
        }

        const ret = await Article.deleteOne({_id: articleId});
        res.status(200).json(ret);

    } catch (error) {
        console.log("error deleting article", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};

export const editArticle = async (req, res) => {
    try {

        const userId = req.user._id;
        const {articleId, title, content} = req.body;

        const article = await Article.findById(articleId);
        const user = await User.findById(userId);

        if (article.authorId != req.user._id && user.role != "staff") {
            return res.status(401).json({error: "Unauthorized article edit attempt"});
        }

        const ret = await Article.findOneAndUpdate(
            { _id: articleId }, 
            { title: title, content: content },
            { new: true }
        );

        res.status(200).json(ret);

    } catch (error) {
        console.log("error editing article", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}
