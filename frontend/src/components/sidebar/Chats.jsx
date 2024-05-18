import useGetChats from "../../hooks/useGetChats.js";
import Chat from "./Chat.jsx";

const Chats = () => {

    const {loading, chats} = useGetChats();
    // console.log("yahhh ", chats);

    return (
        <div className="py-2 flex flex-col overflow-auto">

            {chats.map((chat) => (
                <Chat key = {chat._id} chat={chat}/>
            ))}
 
        </div>
    );
};

export default Chats;