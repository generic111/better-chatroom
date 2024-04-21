import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";
import CryptoJS from "crypto-js";
import validator from "validator";
import { key } from "../assets/key";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();


	const sendMessage = async (message) => {
		setLoading(true);
		
		const filtered = validator.escape(message);
		const cipher = CryptoJS.AES.encrypt(filtered, key).toString();
		const hash = CryptoJS.HmacSHA256(cipher, key).toString();
		// console.log(hash)

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
			content.content = CryptoJS.AES.decrypt(content.content, key).toString(CryptoJS.enc.Utf8);

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

