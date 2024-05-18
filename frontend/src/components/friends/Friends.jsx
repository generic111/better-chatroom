import Conversations from "../sidebar/Conversations.jsx";
import SignOutButton from "../sidebar/SignOutButton.jsx";
import SearchInput from "../sidebar/SearchInput.jsx";
import Chats from "../sidebar/Chats.jsx";

const Friends = () => {
    return (
        <div className="border-r border-slate-500 p-4 flex flex-col"> 
            <SearchInput />
            <div className = 'divider px-3'></div>
            <Conversations /> 
            <Chats />
            <SignOutButton /> 
        </div>
    );
};

export default Friends;