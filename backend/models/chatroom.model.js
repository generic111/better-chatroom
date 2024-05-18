import mongoose from "mongoose";

const chatroomSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatMessage",
            default: [],
        }
    ],
}, {timestamps: true});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

export default Chatroom;