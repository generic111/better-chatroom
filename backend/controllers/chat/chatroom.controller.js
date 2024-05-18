import Chatroom from "../../models/chatroom.model.js";
import ChatMessage from "../../models/chatMessage.model.js";
import { getReceiverSocketId, io, getAll } from "../../socket/socket.js";
import User from "../../models/user.model.js";

export const createChat = async (req, res) => {
    try {
        const {name} = req.body

        let chat = await Chatroom.create({
            username: name,
        });

        res.status(201).json(chat);

    } catch (error) {
        console.log("Error is createChat controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getChats = async (req, res) => {
    try {
        const chats = await Chatroom.find({}).populate("messages");
        res.status(200).json(chats);

    } catch (error) {
        console.log("Error is getChats controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }

}

export const sendChatMessage = async (req, res) => {
    try {
        // console.log(req.body)
        const {message: message} = req.body;
        const {id: chatId} = req.params;
        const senderId = req.user._id;
        const user = await User.findById(senderId);

        if (user.muted) {
            res.status(400).json({error: "User is muted"});
            return;
        }

        let chat = await Chatroom.findById(chatId);

        const newMessage = new ChatMessage({
            senderName: user.username,
            senderId: senderId,
            roomId: chatId,
            content: message,
        });

        if (newMessage) {
            chat.messages.push(newMessage._id);
        }

        await Promise.all([
            chat.save(),
            newMessage.save(),
        ]);

        const receiverSocketId = getAll();

        if (receiverSocketId) {
            for (let i = 0; i < receiverSocketId.length; i++) {
                io.to(receiverSocketId[i]).emit("newChatMessage", newMessage); 
            } 
        }

        // console.log("new message", newMessage);
        res.status(201).json({newMessage: newMessage});
        // res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error is sendChatMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const getChatMessages = async (req, res) => {
    try {
        const {name} = req.body;

        const chat = await Chatroom.findOne({
            name: name,
        }).populate("messages");

        if (!chat) {
            return res.status(200).json([]);
        }

        const messages = chat.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error is getChatMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};