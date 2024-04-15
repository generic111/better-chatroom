import { useState } from "react";
import toast from "react-hot-toast";

const useSendFriendRequest = () => {
	const [loading, setLoading] = useState(false);

	const sendRequest = async (username) => {
		setLoading(true);
        try {
            const res = await fetch("/api/friends/sendFriendRequest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({receiverName: username}),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        
	};

	return { loading, sendRequest };
};

export default useSendFriendRequest;