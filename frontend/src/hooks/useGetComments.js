import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useArticle from "../store/useArticle";

const useGetComments = () => {
	const [loading, setLoading] = useState(false);
	const { comments, setComments, selectedArticle } = useArticle();

	useEffect(() => {
		const getComments = async (hmac) => {
			setLoading(true);

			try {
				const res = await fetch(`/api/articles/getComments/${selectedArticle._id}`);
				const data = await res.json();
					

				if (data.error) {
                    throw new Error(data.error);
                }
                setComments(data);
				// setMessages(decrypted);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedArticle?._id) {
            getComments();
        }
	}, [selectedArticle?._id, setComments]);

	return { comments, loading };
};
export default useGetComments;

