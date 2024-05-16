import { useState } from "react";
import toast from "react-hot-toast";
import useArticle from "../store/useArticle";
import { useAuthContext } from "../context/AuthContext";

const useDeleteComment = () => {
	const [loading, setLoading] = useState(false);
	const { comments, setComments, selectedArticle } = useArticle();

    const { authUser } = useAuthContext();


	const deleteComment = async (comment) => {
		setLoading(true);

        const correct = checkUserPrivilege(authUser, comment);

        if (!correct) {
            toast.error("You do not have the privilege to delete this comment");
            return false;
        }

		try {
			const res = await fetch(`/api/articles/deleteComment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ 
					articleId: selectedArticle._id, 
					commentId: comment._id,
				}),
			});

			let data = await res.json();

			if (data.error) {
                throw new Error(data.error);
            }
			setComments(comments.filter((c) => c._id !== data._id));
		} catch (error) {
			toast.error(error.message);

		} finally {
			setLoading(false);

		}

        return true
	};

	return {deleteComment, loading};
    
};
export default useDeleteComment;

function checkUserPrivilege(user, comment) {
    return user.role === "academic" || user.role === "adiministrative staff" || user.role === "admin" || user._id === comment.authorId;
}

