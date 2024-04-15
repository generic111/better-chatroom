import Conversations from "../sidebar/Friends.jsx";
import SignOutButton from "../sidebar/SignOutButton.jsx";

const Friends = () => {
    return (
        <div> 
            <div className = 'divider px-3'></div>
            <Conversations /> 
            <SignOutButton /> 
        </div>
    );
};

export default Friends;