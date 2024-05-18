import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useArticles from "../store/useArticles";


const useListenArticles = () => {
	const { socket } = useSocketContext();
	const { articles, setArticles } = useArticles();

	useEffect(() => {

		socket?.on("newArticle", (newArticle) => {

			setArticles([...articles, newArticle]);
		});

		return () => socket?.off("newArticle");
	}, [socket, setArticles, articles]);

	useEffect(() => {

		socket?.on("deleteArticle", (id) => {

			setArticles(articles.filter((c) => c._id !== id));
		});

		return () => socket?.off("deleteArticle");
	}, [socket, setArticles, articles]);
};

export default useListenArticles;


