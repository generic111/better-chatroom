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
        <div>
            <div className="w-full p-6 bg-gray-200 rounded-lg">
                <h1>
                    Sign Up
                    <span className="text-blue-600"> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>

                        <input type="text" placeholder="Enter full name" 
                                value={inputs.fullName} 
                                onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                        /> 
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>

                        <input type="text" placeholder="Enter username"
                                value={inputs.username} 
                                onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>

                        <input type="password" placeholder="Enter password"
                                value={inputs.password} 
                                onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>

                        <input type="password" placeholder="Enter password"
                                value={inputs.confirmPassword} 
                                onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                        />
                    </div>

                    <div>
                        <button className="btn" >Sign Up</button>
                    </div>
                </form>
                
            </div>
        
        </div>
    );
};

export default Signup;
