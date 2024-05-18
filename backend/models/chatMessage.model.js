import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chatroom",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export default ChatMessage;