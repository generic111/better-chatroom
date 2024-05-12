import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import useArticles from "../store/useArticles";

const useCreateArticle = () => {
	const [loading, setLoading] = useState(false);
    const { articles, setArticles } = useArticles();
	
	const createArticle = async (title, content) => {
		const yes = emptyFields(title, content);

        if (!yes) return false;

		setLoading(true);
		try {
			const res = await fetch("/api/articles/createArticle", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, content }),
			});

			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
                return false
			}
            
            setArticles([...articles, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}

        return true;
	};

	return { loading, createArticle };
};

export default useCreateArticle;

function emptyFields(title, content) {
	if (!title || !content) {
		toast.error("man u gotta fill it all in");
		return false;
	}

	return true;
}