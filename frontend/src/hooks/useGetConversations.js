import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	// const [conversations, setConversations] = useState([]);
	const {conversations, setConversations} = useConversation();
	// console.log("here");
	useEffect(() => { 
		const getConversations = async () => {
			setLoading(true);
			try {
				// const res = await fetch("/api/users");
				const res = await fetch("/api/friends/getFriendsList");
				
				const data = await res.json();
				// console.log(res);
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return {loading, conversations };
};
export default useGetConversations;

