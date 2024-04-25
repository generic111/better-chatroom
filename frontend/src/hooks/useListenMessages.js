import { useEffect } from "react";
import useConversation from "../store/useConversation";
import { useSocketContext } from "../context/SocketContext";
import CryptoJS from "crypto-js";
import { key } from "../assets/key";
import { decrypt } from "../util/encryption";


const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {

		socket?.on("newMessage", (newMessage, hmac) => {
			// for (let i = 0; i < messages.length; i++) {
			// 	messages[i].content = CryptoJS.AES.decrypt(messages[i].content, key).toString(CryptoJS.enc.Utf8);
			// }
			// console.log(newMessage.content)
			const hash = CryptoJS.HmacSHA256(newMessage.content, key).toString();
			if (hash != hmac) {
				console.log("Hmac mismatch");
				console.log("Hmac mismatch");
				console.log(data_1[i].hmac);
				console.log(hash);
				return;
			}

			newMessage.content = decrypt(newMessage.content, key);
			// console.log(messages);
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;


