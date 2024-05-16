import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useArticles from "../store/useArticles";


const useListenArticles = () => {
	const { socket } = useSocketContext();
	const { articles, setArticles } = useArticles();

	useEffect(() => {

		socket?.on("newArticle", (newArticle) => {

			setSelectedArticle([...articles, newArticle]);
		});

		return () => socket?.off("newArticle");
	}, [socket, setArticles, articles]);
};

export default useListenArticles;


