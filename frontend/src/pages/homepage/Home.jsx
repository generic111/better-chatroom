import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Friends from "../../components/friends/Friends.jsx";
import FriendBar from "../../components/friends/FriendBar.jsx";

const Home = () => {
    return (
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg bg-gray-400">
            {/* <Signup /> */}
            <FriendBar />
            <Friends />
            {/* <Sidebar /> */}
            <MessageContainer />
        </div>
    );
};

export default Home;