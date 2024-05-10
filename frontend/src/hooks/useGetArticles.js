import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const useGetArticles = () => {
	const [loading, setLoading] = useState(false);
	const [articles, setArticles] = useState([]);

	console.log("here");

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
	}, []);

	return {loading, articles };
};

export default useGetArticles;

