import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import useArticles from "../store/useArticles";
import useConversation from "../store/useConversation";

const useCreateChat = () => {
	const [loading, setLoading] = useState(false);
    const { chats, setChats } = useConversation();
	
	const createChat = async (name) => {
		const yes = emptyFields(name);

        if (!yes) return false;

		setLoading(true);
		try {
			const res = await fetch("/api/chat/createChat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name }),
			});

			const data = await res.json();

			if (data.error) {

				toast.error(data.error);
                return true;
			}
            
            setChats([...chats, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
		toast.success("Chat created successfully");
        return true;
	};

	return { loading, createChat };
};

export default useCreateChat;

function emptyFields(name) {
	if (!name) {
		toast.error("man u gotta fill it in");
		return false;
	}

	return true;
}