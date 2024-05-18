import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";

const useGetChats = () => {
	const [loading, setLoading] = useState(false);
	// const [chats, setChats] = useState([]);

    const {chats, setChats} = useConversation();
	// console.log("here");
	useEffect(() => { 
		const getChats = async () => {
			setLoading(true);
			try {
				// const res = await fetch("/api/users");
				const res = await fetch("/api/chat/getChats");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setChats(data);
			} catch (error) {
                console.log("error getting chats", error.message);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getChats();

	}, []);

	return {loading, chats };
};
export default useGetChats;

