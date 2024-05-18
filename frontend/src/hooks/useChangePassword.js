
import { useState } from "react";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";


const useChangePassword = () => {
	const [loading, setLoading] = useState(false);
	
	const changePassword = async (newPassword, confirmPassword) => {
		const yes = checkInput(newPassword, confirmPassword);

		const hashed_password = await CryptoJS.SHA256(newPassword).toString(CryptoJS.enc.Hex);
        const hashed_confirmPassword = await CryptoJS.SHA256(confirmPassword).toString(CryptoJS.enc.Hex);

        if (!yes) return false;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/changePassword", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ newPassword: hashed_password, confirmPassword: hashed_confirmPassword }),
			});

			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
                return false
			}
			toast.success("password changed");
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}

        return true;
	};

	return { loading, changePassword };
};

export default useChangePassword;

function checkInput(password, confirmPassword) {
	if (!password || !confirmPassword) {
		toast.error("man u gotta fill it all in");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("passwords don't match");
		return false;
	}

	if (password.length < 6) {
		toast.error("password too short");
		return false;
	}

	return true;
}