import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const useGetUsers = () => {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);

	// console.log("here");
	useEffect(() => { 
		const getUsers = async () => {
			setLoading(true);
			try {
				// const res = await fetch("/api/users");
				const res = await fetch("/api/users");
				
				const data = await res.json();
				// console.log(data);
				if (data.error) {
					throw new Error(data.error);
				}
				setUsers(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getUsers();
	}, []);

	return {loading, users };
};
export default useGetUsers;

