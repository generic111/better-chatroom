import useGetConversations from "../../hooks/useGetConversations.js";
import Conversation from "./Conversation.jsx";
import useListenConversations from "../../hooks/useListenConversations.js";

const Conversations = () => {

    const {loading, conversations} = useGetConversations();
    // console.log("yahhh ", conversations);
    useListenConversations();
    

    return (
        <div className="py-2 flex flex-col overflow-auto">

            {conversations.map((conversation) => (
                <Conversation key = {conversation._id} conversation={conversation}/>
            ))}
 
        </div>
    );
};

export default Conversations;