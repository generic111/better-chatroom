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
                throw new Error(data.error);
            }
			setMessages([...messages, content]);
		} catch (error) {
			toast.error(error.message);

		} finally {
			setLoading(false);

		}
	};

	return {sendMessage, loading};
    
};
export default useSendMessage;

