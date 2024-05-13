
import { useAuthContext } from "../../context/AuthContext.jsx";

const AccountProfile = () => {
    const {authUser} = useAuthContext();

    const profilePic = `https://avatar.iran.liara.run/username?username=${authUser.fullName}`
    return (
        <div className="p-5 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-25 h-full"> 

            <div className="flex">
                <div className="flex">
                    <div className="chat-image avatar">
                        <div className="w-16 rounded-full">
                            <img src={profilePic} alt="avatar"/>
                        </div>
                    </div>

                    <div className="flex flex-col ml-5">
                        <p className = 'text-2xl font-bold text-red-600'>{authUser.username}</p>
                    </div>


                    <div className="flex justify-center bg-yellow-400 h-4 rounded ml-3 mt-2">
                        <p className = 'text-xs font-bold text-black content-center'> {authUser.role} </p>
                    </div>


                </div>
                
            </div>           
        </div>
    );
};

export default AccountProfile;
