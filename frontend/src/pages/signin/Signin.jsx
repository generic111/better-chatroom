import { useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../../hooks/useSignin";

const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {loading, signin} = useSignin() 

    const handleUserData = async (e) => {
        e.preventDefault();
        await signin(username, password);
    }

    return (
        <div className="flex flex-col items-center justify-center mx-auto p-2">
            <div className="w-1/4 justify-center item-center p-6 bg-gray-300 rounded-md my-20 
                shadow-md backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-100">
            {/* < div className = "w-1/4 justify-center item-center bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-100"> */}
            
                <h1 className="text-black p-2 text-2xl">
                    Sign In
                    <span className="text-blue-600 p-2"> ChatApp</span>
                </h1>

                <form onSubmit={handleUserData}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>

                        <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"
                            value = {username} onChange = {(e) => setUsername(e.target.value)}/>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>

                        <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10"
                            value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                    </div>

                    <Link to="/signup" className="text-blue-600">
                        Don't have an account? Sign Up
                    </Link>

                    <div>
                        <button className="btn">Sign In</button>
                    </div>
                </form>
                
            </div>
        
        </div>
    );
};

export default Signin;