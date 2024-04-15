import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    senders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    username: {
        type: String,
        required: true,
        unique: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User",
    },
}, {timestamps: true});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;