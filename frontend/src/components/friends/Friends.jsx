import Conversations from "../sidebar/Conversations.jsx";
import SignOutButton from "../sidebar/SignOutButton.jsx";
import SearchInput from "../sidebar/SearchInput.jsx";
import DeleteFriend from "../sidebar/DeleteFriend";

const Friends = () => {
    return (
        <div className="border-r border-slate-500 p-4 flex flex-col"> 
            <SearchInput />
            <>...</>
            <DeleteFriend />
            <div className = 'divider px-3'></div>
            <Conversations /> 
            <SignOutButton /> 
        </div>
    );
};

export default Friends;