import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const {loading, signup} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto p-2">
            <div className="w-1/4 justify-center item-center p-6 bg-gray-300 rounded-md my-20 
                shadow-md backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-100">
                <h1 className="text-black p-2 text-2xl">
                    Sign Up
                    <span className="text-blue-600 p-2"> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>

                        <input type="text" placeholder="Enter full name" 
                                value={inputs.fullName} 
                                onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                                className="w-full input input-bordered h-10"
                        /> 
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>

                        <input type="text" placeholder="Enter username"
                                value={inputs.username} 
                                onChange={(e) => setInputs({...inputs, username: e.target.value})}
                                className="w-full input input-bordered h-10"
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>

                        <input type="password" placeholder="Enter password"
                                value={inputs.password} 
                                onChange={(e) => setInputs({...inputs, password: e.target.value})}
                                className="w-full input input-bordered h-10"
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>

                        <input type="password" placeholder="Enter password"
                                value={inputs.confirmPassword} 
                                onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                                className="w-full input input-bordered h-10"
                        />
                    </div>
                    <Link to="/signin" className="text-blue-600">
                        Already have an account? Sign In
                    </Link>
                    <div>
                        <button className="btn" >Sign Up</button>
                    </div>
                </form>
                
            </div>
        
        </div>
    );
};

export default Signup;
