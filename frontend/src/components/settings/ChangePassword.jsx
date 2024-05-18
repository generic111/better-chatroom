import useChangePassword from "../../hooks/useChangePassword";
import { useState } from "react";



const ChangePassword = () => {
    const {changePassword} = useChangePassword();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ret = await changePassword(password, confirmPassword);

        if (ret) {
            setPassword("");
            setConfirmPassword("");
        }
    }

    return (
        <div className="mt-10"> 
            <form onSubmit={handleSubmit}>

                <div className="flex-row my-5">
                    <div className="my-5">
                        <label className="font-bold text-xl mr-10">New password</label>
                    </div>

                    <div>
                        <input type="text" placeholder={"password"} value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="border-2 border-gray-300 p-1 rounded-md mr-10 input h-9"/>
                    </div>
                </div>

                <div className="my-5">
                    <div className="my-5">
                        <label className="font-bold text-xl mr-10">Confirm new password</label>
                    </div>

                    <div>
                        <input type="text" placeholder={"confirm password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="border-2 border-gray-300 p-1 rounded-md mr-10 input h-9"/>
                    </div>
                </div>
                <button className="bg-blue-500 text-white p-1 rounded-md mt-10">Change</button>
            </form>
       
        </div>
    );
};

export default ChangePassword;
