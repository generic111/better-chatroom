import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    
    const signup = async({fullName, username, password, confirmPassword}) => {
        const yes = handleUserErrors({fullName, username, password, confirmPassword});
        if (!yes) return;

        setLoading(true);
        try {

            console.log("here1")

            const res = await fetch("/api/auth/signup", {
                method: "POST",  
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({fullName, username, password, confirmPassword,}),
            });

            console.log(res);

            console.log("here2");


            const data = await res.json();
            console.log(data);
            console.log("after datat");

        } catch (error) {
            toast.error(error.message);
            console.log("error came here?");
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