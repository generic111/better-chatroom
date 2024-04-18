import useGetFriendRequests from "../../hooks/useGetFriendRequests.js";
import Conversations from "../sidebar/Conversations.jsx";
import SignOutButton from "../sidebar/SignOutButton.jsx";
import FriendRequest from "./FriendRequest.jsx";

const FriendRequestList = () => {
    
    const {loading, friendRequests} = useGetFriendRequests();
    // console.log("friendRequests ", friendRequests);

    return (
        <div className="py-2 flex flex-col overflow-auto">

            {friendRequests.map((request) => (
                <FriendRequest key = {request._id} request={request}/>
            ))}
 
        </div>
    );
};

export default FriendRequestList;