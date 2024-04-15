import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useProcessFriendRequest = () => {
	const [loading, setLoading] = useState(false);

	const processRequest = async (accept, name) => {
		setLoading(true);

        if (accept === true) {
            try {
                const res = await fetch("/api/friends/acceptFriendRequest", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({senderName: name}),
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
        }

        else {
            try {
                const res = await fetch("/api/friends/rejectFriendRequest", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({senderName: name}),
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

        }
	};

	return { loading, processRequest };
};
export default useProcessFriendRequest;