import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import CryptoJS from "crypto-js";


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser} = useAuthContext();
    
    const signup = async({fullName, username, password, confirmPassword}) => {
        const yes = handleUserErrors({fullName, username, password, confirmPassword});
        if (!yes) return;
        // const hashed_password = password;
        const hashed_password = await CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        const hashed_confirmPassword = await CryptoJS.SHA256(confirmPassword).toString(CryptoJS.enc.Hex);
        setLoading(true);
        try {

            const res = await fetch("/api/auth/signup", {
                method: "POST",  
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({fullName, username, password: hashed_password, confirmPassword: hashed_confirmPassword,}),
            });


            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // console.log(data);
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {loading, signup};

}   

export default useSignup;

function handleUserErrors({fullName, username, password, confirmPassword}) {
    if (!fullName || !username || !password || !confirmPassword) {
        toast.error("Bro fill in all fields");
        return false;
    } else if (password !== confirmPassword) {
        toast.error("Dude your passwords don't match");
        return false;
    } else if (password.length < 6) {
        toast.error("Brother your password is too short");
        return false;
    }

    return true;
}