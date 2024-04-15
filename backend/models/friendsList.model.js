import mongoose from "mongoose";

const friendsListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
}, {timestamps: true});

const FriendsList = mongoose.model("FriendsList", friendsListSchema);

export default FriendsList;