import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";

const Messages = () => {

    const {messages, loading } = useGetMessages();
    useListenMessages();
    console.log(messages);

    return (
        <div className="px-4 flex-1 overflow-auto">
            { !loading && messages.length > 0 && messages.map((message) => (
                <Message key = {message._id} message = {message} />
            ))}, 
        </div>
    );
};

export default Messages;