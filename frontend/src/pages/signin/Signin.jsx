import { Link } from "react-router-dom";

const Signin = () => {
    return (
        <div>
            <div className="w-full p-6 bg-gray-200 rounded-lg">
                <h1>
                    Sign In

                    <span className="text-blue-600"> ChatApp</span>
                </h1>

                <form>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>

                        <input type="text" placeholder="Enter username"/>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>

                        <input type="password" placeholder="Enter password"/>
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