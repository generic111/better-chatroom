import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    commentList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: [],
        }
    ],
}, {timestamps: true});

const Article = mongoose.model("Article", articleSchema);

export default Article;