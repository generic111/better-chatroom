import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useArticles from "../store/useArticles";

const useGetArticles = () => {
	const [loading, setLoading] = useState(false);
	// const [articles, setArticles] = useState([]);
    const { articles, setArticles } = useArticles();

	// console.log("here");

	useEffect(() => { 
		const getArticle = async () => {
			setLoading(true);
			try {
				// const res = await fetch("/api/users");
				const res = await fetch("/api/articles/getArticles");
				
				const data = await res.json();
				// console.log(data);
				if (data.error) {
					throw new Error(data.error);
				}
				setArticles(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
        
		getArticle();
	}, [setArticles]);

	return {loading, articles };
};

export default useGetArticles;

