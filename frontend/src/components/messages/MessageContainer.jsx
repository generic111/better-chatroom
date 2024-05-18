import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../store/useConversation";
import { useEffect } from "react";
import ChatMessages from "./ChatMessages";

function ContainerContent({selectedConversation, isChatroom}) {
    if (!selectedConversation) {
        return (
            <div></div>
        );
    }

    else if (!isChatroom) {
        
        return (
            <>
                <Messages />
                <MessageInput />
            </>
        )
    }
    
    return (
        <>
            <ChatMessages />
            <MessageInput />
        </>
    );
}

const MessageContainer = () => {

    const {selectedConversation, setSelectedConversation, isChatroom} = useConversation()
  
    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
		<div className='flex flex-col md:min-w-[500px]'>

            <div className="bg-slate-500 text-black px-4 py-2">
                <span className="label-text text-black text-lg">To:</span>{" "}
                <span className="text-black text-lg">{!selectedConversation ? "No one selected": selectedConversation.username}</span>
            </div>

			<ContainerContent selectedConversation={selectedConversation} isChatroom={isChatroom} />
		</div>
	);
}

export default MessageContainer;