import Conversations from "../sidebar/Conversations.jsx";
import SignOutButton from "../sidebar/SignOutButton.jsx";
import SearchInput from "../sidebar/SearchInput.jsx";

const Friends = () => {
    return (
        <div> 
            <SearchInput />
            <div className = 'divider px-3'></div>
            <Conversations /> 
            <SignOutButton /> 
        </div>
    );
};

export default Friends;