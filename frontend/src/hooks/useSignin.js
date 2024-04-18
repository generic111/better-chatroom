import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";

const useSignin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	
	const signin = async (username, password) => {
		
		const yes = userErrors(username, password);
		// const hashed_password = password;
		const hashed_password = await CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
		if (!yes) return;
		setLoading(true);
		try {
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password: hashed_password, }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signin };
};
export default useSignin;

function userErrors(username, password) {
	if (!username || !password) {
		toast.error("man u gotta fill it all in");
		return false;
	}

	return true;
}