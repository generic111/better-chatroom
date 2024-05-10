import User from "../../models/user.model.js";
import Article from "../../models/article.model.js";
import Comment from "../../models/comment.model.js";


export const comment = async (req, res) => {
    try {
        
        const userId = req.user._id;
        const {articleId, comment} = req.body;

        const article = await Article.findById(articleId);

        const user = await User.findById(userId);

        const newComment = await Comment({
            autherName: user.username,
            authorId: user,
            content: comment,
        });

        if (newComment) {
            await article.commentList.push(newComment);

            await Promise.all([
                newComment.save(),
                article.save(),
            ]);

            res.status(201).json(newComment);
        }

        else {
            res.status(400).json({error: "Comment not created"});
        }

    } catch (error) {
        console.log("error creating comment", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};

export const getComments = async (req, res) => {
    try {
        const {id: articleId} = req.params;

        const article = await Article.findById(articleId).populate("commentList");

        res.status(200).json(article.commentList);

    } catch (error) {
        console.log("error getting comments", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const deleteComment = async (req, res) => {
    try {

        // check if its a staff member
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (user.role !== "staff") {
            return res.status(401).json({error: "Cannot delete not staff member"});
        }


        const {commentId, articleId} = req.body;

        const article = await Article.findById(articleId);
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({error: "Comment not found"});
        }

        await Article.updateOne({
            _id: articleId,
        }, {
            $pull: {
                commentList: commentId,
            },
        });

        await Comment.deleteOne({_id: commentId});
        

        res.status(200).json({message: "Comment deleted"});

    } catch (error) {
        console.log("error deleting comment", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}