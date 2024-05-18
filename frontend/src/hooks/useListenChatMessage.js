import { useEffect } from "react";
import useConversation from "../store/useConversation";
import { useSocketContext } from "../context/SocketContext";


const useListenChatMessage = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {

		socket?.on("newChatMessage", (newChatMessage) => {

			setMessages([...messages, newChatMessage]);
		});

		return () => socket?.off("newChatMessage");
	}, [socket, setMessages, messages]);
};
export default useListenChatMessage;


