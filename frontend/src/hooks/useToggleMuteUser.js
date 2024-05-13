
import { useState } from "react";
import toast from "react-hot-toast";


const useToggleMuteUser = () => {
	const [loading, setLoading] = useState(false);
	
	const toggleMuteUser = async (user, muted) => {
		setLoading(true);
		let endpoint = "/api/auth/muteUser";
		let string = "muted";

		if (muted) {
			endpoint = "/api/auth/unmuteUser";
			string = "unmuted";
		}

		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: user.username }),
			});

			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
                return false
			}
            
			toast.success(`User ${string}`);

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}

        return true;
	};

	return { loading, toggleMuteUser };
};

export default useToggleMuteUser;