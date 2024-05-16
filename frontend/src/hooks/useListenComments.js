import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useArticle from "../store/useArticle";


const useListenComments = () => {
	const { socket } = useSocketContext();
	const { comments, setComments } = useArticle();

	useEffect(() => {

		socket?.on("newComment", (newComment) => {

			setSelectedArticle([...comments, newComment]);
		});

		return () => socket?.off("newComment");
	}, [socket, setComments, comments]);
};

export default useListenComments;


