import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    autherName: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;