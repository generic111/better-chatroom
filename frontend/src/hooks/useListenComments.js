import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useArticle from "../store/useArticle";


const useListenComments = () => {
	const { socket } = useSocketContext();
	const { comments, setComments } = useArticle();

	useEffect(() => {

		socket?.on("newComment", (newComment) => {

			setComments([...comments, newComment]);
		});

		return () => socket?.off("newComment");
	}, [socket, setComments, comments]);

	useEffect(() => {

		socket?.on("deleteComment", (id) => {

			setComments(comments.filter((c) => c._id !== id));
		});

		return () => socket?.off("deleteComment");
	}, [socket, setComments, comments]);
};

export default useListenComments;


