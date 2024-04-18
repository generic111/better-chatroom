import { useEffect } from "react";
import useConversation from "../store/useConversation";
import { useSocketContext } from "../context/SocketContext";
import CryptoJS from "crypto-js";


const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		const key = "Some hey"
		socket?.on("newMessage", (newMessage, hmac) => {
			// for (let i = 0; i < messages.length; i++) {
			// 	messages[i].content = CryptoJS.AES.decrypt(messages[i].content, key).toString(CryptoJS.enc.Utf8);
			// }
			const hash = CryptoJS.HmacSHA256(newMessage.content, key).toString();
			if (hash !== hmac) {
				console.log("Hmac mismatch");
				return;
			}

			newMessage.content = CryptoJS.AES.decrypt(newMessage.content, key).toString(CryptoJS.enc.Utf8);
			// console.log(messages);
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;


