import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const useGetFriendRequests = () => {
	const [loading, setLoading] = useState(false);
	const [friendRequests, setFriendRequests] = useState([]);
	console.log("useGetFriendRequests");
	useEffect(() => { 
		const getFriendRequests = async () => {
			setLoading(true);
			try {
				// const res = await fetch("/api/users");
				const res = await fetch("/api/friends/getFriendRequest");
				
				const data = await res.json();
				console.log(data);
				if (data.error) {
					throw new Error(data.error);
				}
				setFriendRequests(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getFriendRequests();
	}, []);

	return {loading, friendRequests };
};
export default useGetFriendRequests;

