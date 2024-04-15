import FriendRequest from "../models/friendRequestsModel.js";
import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user._id;
        const {receiverName} = req.body;

        const receiver = await User.findOne({username: receiverName});
        

        if (!receiver) {
            return res.status(400).json({error: "User doesn't exist exists"});
        }

        const exists = await FriendRequest.findOne({
            sender: senderId,
            receiver: receiver._id,
        });

        if (exists) {
            return res.status(400).json({error: "friend request already exists"});
        };

        const newFriendRequest = await FriendRequest({
            sender: senderId,
            receiver: receiver._id,
        });
        
        if (newFriendRequest) {
            await newFriendRequest.save();

            res.status(201).json({
                sender: senderId,
                receiver: receiver._id,
            });
        }
        
        else {
            return res.status(400).json({error: "Friend request failure"});
        }


    } catch (error) {
        console.log("error sending friend request", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};

export const acceptFriendRequest = async(req, res) => {
    try {
        const {senderName, receiverName} = req.body;

        const sender = await User.findOne({username: senderName});
        const receiver = await User.findOne({username: receiverName});
        

        if (!receiver) {
            return res.status(400).json({error: "User doesn't exist exists"});
        }

        const exists = await FriendRequest.findOne({
            sender: sender._id,
            receiver: receiver._id,
        });

        if (exists) {
            return res.status(400).json({error: "friend request already exists"});
        };

        const newFriendRequest = await FriendRequest({
            sender: sender._id,
            receiver: receiver._id,
        });
        
        if (newFriendRequest) {
            await newFriendRequest.save();

            res.status(201).json({
                sender: sender._id,
                receiver: receiver._id,
            });
        }
        
        else {
            return res.status(400).json({error: "Friend request failure"});
        }


    } catch (error) {
        console.log("error sending friend request", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};