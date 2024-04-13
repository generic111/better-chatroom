import Conversations from "./Conversations.jsx";
import SignOutButton from "./SignOutButton.jsx";

const Sidebar = () => {
    return (
        <div> 
            <div className = 'divider px-3'></div>
            <Conversations /> 
            <SignOutButton /> 
        </div>
    );
};

export default Sidebar;