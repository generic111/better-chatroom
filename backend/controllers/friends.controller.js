import FriendRequest from "../models/friendRequestsModel.js";
import User from "../models/user.model.js";
import FriendsList from "../models/friendsList.model.js";

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
        const receiverID = req.user._id;
        const {senderName} = req.body;
        
        const sender = await User.findOne({
            username: senderName,
        });

        const receiver = await User.findById({
            _id: receiverID,
        });

        const friendRequests = await FriendRequest.findOne({
            sender: sender._id,
            receiver: receiverID,
        });

        let friendsListReceive = await FriendsList.findOne({
            user: receiverID,
        });

        let friendsListSend = await FriendsList.findOne({
            user: sender._id,
        });

        if (!friendsListReceive) {
            friendsListReceive = await FriendsList.create({
                user: receiverID,
                username: receiver.username,
                members: [],
            });
        }

        if (!friendsListSend) {
            friendsListSend = await FriendsList.create({
                user: sender._id,
                username: sender.username,
                members: [],
            });
        }

        if (friendsListReceive.members.includes(sender._id)) {
            return res.status(400).json({error: "Friend already exists."});
        }

        friendsListReceive.members.push(sender._id);
        friendsListSend.members.push(receiverID);

        await Promise.all([
            friendsListReceive.save(),
            friendsListSend.save(),
        ]);

        return res.status(200).json({
            user: friendsListReceive.user,
            list: friendsListReceive.requests,
        });


    } catch (error) {
        console.log("error accepting friend request", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};