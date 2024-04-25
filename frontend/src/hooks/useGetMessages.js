import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";
import CryptoJS from "crypto-js";
import { body } from "express-validator";
import { key } from "../assets/key";
import { decrypt } from "../util/encryption";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async (hmac) => {
			setLoading(true);

			// console.log("here")
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				let data_1 = data;
				for (let i = 0; i < data.length; i++) {
					data_1[i].content = decrypt(data_1[i].content, key);
					const hash = CryptoJS.HmacSHA256(data_1[i].hmac, key).toString();
					if (hash != data_1[i].hmac) {
						console.log("Hmac mismatch");
						return;
					}
				}

				

				// console.log(data_1);
				if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
				// setMessages(decrypted);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) {
            getMessages();
        }
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;

