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

			const hash = CryptoJS.HmacSHA256(newMessage.content, key).toString();
			if (hash != hmac) {
				console.log("Hmac mismatch");

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


