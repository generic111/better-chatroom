import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

import useConversation from "../store/useConversation";


const useListenConversations = () => {
	const { socket } = useSocketContext();
	const { conversations, setConversations } = useConversation();

	// useEffect(() => {

	// 	socket?.on("newFriend", (newFriend) => {

	// 		setArticles([...articles, newArticle]);
	// 	});

	// 	return () => socket?.off("newFriend");
	// }, [socket, setArticles, articles]);

	useEffect(() => {

		socket?.on("deleteFriend", (id) => {
            console.log(conversations);
            console.log(id);

			setConversations(conversations.filter((c) => c._id !== id));
		});

		return () => socket?.off("deleteFriend");
	}, [socket, setConversations, conversations]);
};

export default useListenConversations;


