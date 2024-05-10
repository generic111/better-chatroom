import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Friends from "../../components/friends/Friends.jsx";
import FriendBar from "../../components/friends/FriendBar.jsx";

const Chat = () => {
    return (
        <div>
            <div className="flex sm:h-[450px] md:h-[550px] rounded-lg bg-gray-400">
                
                {/* <Signup /> */}
                <FriendBar />
                <Friends />
                {/* <Sidebar /> */}
                <MessageContainer />
            </div>
        </div>
    );
};

export default Chat;