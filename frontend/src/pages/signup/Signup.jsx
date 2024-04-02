const Signup = () => {
    return (
        <div>
            <div className="w-full p-6 bg-gray-200 rounded-lg">
                <h1>
                    Sign Up

                    <span className="text-blue-600"> ChatApp</span>
                </h1>

                <form>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>

                        <input type="text" placeholder="Enter username"/>
                    </div>

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

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>

                        <input type="password" placeholder="Enter password"/>
                    </div>

                    <div>
                        <button className="btn">Sign Up</button>
                    </div>
                </form>
                
            </div>
        
        </div>
    );
};

export default Signup;
