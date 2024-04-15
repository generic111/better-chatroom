import Conversations from "./Conversations.jsx";
import SearchInput from "./SearchInput.jsx";
import SignOutButton from "./SignOutButton.jsx";

const Sidebar = () => {
    return (
        <div> 
            <SearchInput />
            <div className = 'divider px-3'></div>
            <Conversations /> 
            <SignOutButton /> 
        </div>
    );
};

export default Sidebar;