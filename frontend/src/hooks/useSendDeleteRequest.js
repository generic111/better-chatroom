import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useSendDeleteRequest = () => {
	const [loading, setLoading] = useState(false);
    const {conversations, setConversations, setSelectedConversation } = useConversation();


	const sendRequest = async (username) => {
		setLoading(true);
        try {
            const res = await fetch("/api/friends/deleteFriend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({receiverName: username}),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setConversations(conversations.filter((c) => c.username !== username));
            setSelectedConversation(null);
            toast.success("Delete friend successful");
        } catch (error) {
            toast.error(error.message);
        } finally {
            
            setLoading(false);
        }
        
	};

	return { loading, sendRequest };
};

export default useSendDeleteRequest;