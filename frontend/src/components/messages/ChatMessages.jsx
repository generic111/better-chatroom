import useListenChatMessage from "../../hooks/useListenChatMessage";
import useGetChatMessages from "../../hooks/useGetChatMessages";
import Message from "./Message";
import { useEffect, useRef } from "react";

const ChatMessages = () => {

    const {messages, loading } = useGetChatMessages();

    useListenChatMessage();
    // console.log(messages);

	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            { !loading && messages.length > 0 && messages.map((message) => (
                <div ref={lastMessageRef}>
                    <Message key = {message._id} message = {message} />
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;