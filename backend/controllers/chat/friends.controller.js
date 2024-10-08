import FriendRequest from "../../models/friendRequestsModel.js";
import User from "../../models/user.model.js";
import FriendsList from "../../models/friendsList.model.js";
import Conversation from "../../models/conversation.model.js";
import { getReceiverSocketId, io } from "../../socket/socket.js";

export const sendFriendRequest = async (req, res) => {
    // console.log("sendFriendRequest")
    try {

        const senderId = req.user._id;
        const {receiverName} = req.body;

        const receiver = await User.findOne({username: receiverName});
        

        if (!receiver) {
            return res.status(400).json({error: "User doesn't exist exists"});
        }

        let friendRequests = await FriendRequest.findOne({
            receiver: receiver._id,
        });

        if (!friendRequests) {
            friendRequests = await FriendRequest.create({
                receiver: receiver._id,
                username: receiver.username,
                senders: [],
            });
        };

        if (friendRequests.senders.includes(senderId)) {
            return res.status(200).json({error: "Friend request already sent."});
        };

        friendRequests.senders.push(senderId);
        
        if (friendRequests) {
            await friendRequests.save();

            res.status(201).json({
                sender: senderId,
                receiver: receiver._id,
            });
        }
        
        else {
            return res.status(400).json({error: "Friend request failure"});
        };


    } catch (error) {
        console.log("error sending friend request", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};

export const rejectFriendRequest = async(req, res) => {
    // console.log("rejectFriendRequest")
    try {
        const receiverID = req.user._id;
        const {senderName} = req.body;
        
        const sender = await User.findOne({
            username: senderName,
        });

        const friendRequest = await FriendRequest.findOne({receiver: receiverID});

        if (!friendRequest) {
            return res.status(400).json({error: "Friend request doesn't exist"});
        }
        
        // console.log(sender._id)
        // console.log(receiverID)
        const ret = await FriendRequest.updateOne({
            receiver: receiverID,
        }, {
            $pull: {
                senders: sender._id,
            },
        });

        // console.log(ret);
        
    } catch (error) {
        console.log("error accepting friend request", error.message);
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

        const friendRequest = await FriendRequest.findOne({receiver: receiverID});

        if (!friendRequest) {
            return res.status(400).json({error: "Friend request doesn't exist"});
        }

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
        
        // console.log(sender._id)
        // console.log(receiverID)
        await FriendRequest.updateOne({
            receiver: receiverID,
        }, {
            $pull: {
                senders: sender._id,
            },
        });
        
        if (friendsListReceive.members.includes(sender._id)) {
            return res.status(200).json({error: "Friend already exists."});
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

export const getFriendRequests = async(req, res) => {
    try {
        const currentUser = req.user._id;
        
        const friendRequests = await FriendRequest.findOne({
            receiver: currentUser,
        });

        if (!friendRequests) {
            return res.status(200).json([]);
        };

        let users = []

        for (let i = 0; i < friendRequests.senders.length; i++) {
            users.push(await User.findById(friendRequests.senders[i]));
        
        }
        
        res.status(200).json(users);

    } catch (error) {
        console.log("error accepting friend request", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};


export const deleteFriend = async (req, res) => {
    try {

        const senderId = req.user._id;
        const {receiverName} = req.body;

        const receiver = await User.findOne({
            username: receiverName
        });

        const sender = await User.findById({
            _id: senderId,
        });

        if (!receiver) {
            return res.status(400).json({error: "User doesn't exist exists"});
        }

        let friendsListReceive = await FriendsList.findOne({
            username: receiverName
        });

        let friendsListSend = await FriendsList.findOne({
            user: sender._id,
        });


        if (!friendsListReceive.members.includes(sender._id) || !friendsListSend.members.includes(receiver._id)) {
            return res.status(200).json({error: "Not a Friend"});
        }

        // remove friend from friends list
        const indexSender = friendsListReceive.members.indexOf(sender._id);
        const indexReciever = friendsListSend.members.indexOf(receiver._id);

        // const x = myArray.splice(index, 1);
        friendsListReceive.members.splice(indexSender, 1);
        friendsListSend.members.splice(indexReciever, 1);

        // remove conversations from these friends 
        // let conversation1 = await Conversation.findOne({
        //     members: [sender._id, receiver._id]
        // });

        // let conversation2 = await Conversation.findOne({
        //     members: [receiver._id, sender._id]
        // });
        
        // let convo = conversation1 ? conversation1 : conversation2;

        // if (convo) {
        //     convo.messages = [];
        //     convo.save();
        // }

        const receiverSocketId = getReceiverSocketId(receiver._id);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("deleteFriend", sender._id);  
        }

        await Promise.all([
            friendsListReceive.save(),
            friendsListSend.save(),
        ]);

        return res.status(200).json({
            user: friendsListReceive.user,
            list: friendsListReceive.requests,
        });


    } catch (error) {
        console.log("error deleting friend", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};