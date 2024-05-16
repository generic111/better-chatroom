import { useState } from "react";
import toast from "react-hot-toast";
import useArticles from "../store/useArticles";
import { useAuthContext } from "../context/AuthContext";
import useArticle from "../store/useArticle";

const useDeleteArticle = () => {
	const [loading, setLoading] = useState(false);
	const { articles, setArticles } = useArticles();
    const {selectedArticle, setSelectedArticle} = useArticle();

    const { authUser } = useAuthContext();


	const deleteArticle = async () => {
		setLoading(true);

        const correct = checkUserPrivilege(authUser, selectedArticle);

        if (!correct) {
            toast.error("You do not have the privilege to delete this article");
            return false;
        }

		try {
			const res = await fetch(`/api/articles/deleteArticle`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ 
					articleId: selectedArticle._id, 
				}),
			});

			let data = await res.json();

			if (data.error) {
                throw new Error(data.error);
                return false;
            }
			setArticles(articles.filter((c) => c._id !== selectedArticle._id));
		} catch (error) {
			toast.error(error.message);

		} finally {
			setLoading(false);

		}

        return true
	};

	return {deleteArticle, loading};
    
};
export default useDeleteArticle;

function checkUserPrivilege(user, article) {
    return user.role === "academic" || user.role === "adiministrative staff" || user.role === "admin" ||user._id === article.authorId;
}

