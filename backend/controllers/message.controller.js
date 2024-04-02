import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiveId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: {
                $all: [senderId, receiveId],
            },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiveId],
            });
        };

        const newMessage = new Message({
            senderId: senderId,
            receiveId: receiveId,
            content: message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([
            conversation.save(),
            newMessage.save(),
        ]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error is sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatWith} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            members: {
                $all: [senderId, userToChatWith],
            },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error is getMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};