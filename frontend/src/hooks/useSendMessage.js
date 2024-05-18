import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";
import CryptoJS from "crypto-js";
import validator from "validator";
import { key } from "../assets/key";
import { encrypt, decrypt } from "../util/encryption";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();


	const sendMessage = async (message) => {
		setLoading(true);
		const filtered = validator.escape(message);

		const cipher = encrypt(filtered, key);
		const hash = CryptoJS.HmacSHA256(cipher, key).toString();

		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ 
					message: cipher, 
					hmac: hash,
				}),
			});

			let data = await res.json();
			const content = data['newMessage'];
			content.content = decrypt(content.content, key);

			if (data.error) {
                toast.error(data.error);
				return;
            }
			setMessages([...messages, content]);
		} catch (error) {
			toast.error(error.message);

		} finally {
			setLoading(false);

		}
	};

	const sendChatMessage = async (message) => {
		setLoading(true);

		try {
			const res = await fetch(`/api/chat/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ 
					message: message, 
				}),
			});

			let data = await res.json();

			if (data.error) {
                toast.error(data.error);
				return;
            }
			setMessages([...messages, data['newMessage']]);
		} catch (error) {
			toast.error(error.message);

		} finally {
			setLoading(false);

		}
	};

	return {sendMessage, sendChatMessage, loading};
    
};
export default useSendMessage;

