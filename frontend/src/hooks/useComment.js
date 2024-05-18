import { useState } from "react";
import toast from "react-hot-toast";
import useArticle from "../store/useArticle";

const useComment = () => {
	const [loading, setLoading] = useState(false);
	const { comments, setComments, selectedArticle } = useArticle();


	const sendComment = async (comment) => {
		setLoading(true);

		try {
			const res = await fetch(`/api/articles/comment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ 
					articleId: selectedArticle._id, 
					comment: comment,
				}),
			});

			let data = await res.json();

			if (data.error) {
                toast.error(data.error);
				return true;
            }
			setComments([...comments, data]);
		} catch (error) {
			toast.error(error.message);

		} finally {
			setLoading(false);

		}
	};

	return {sendComment, loading};
    
};
export default useComment;

