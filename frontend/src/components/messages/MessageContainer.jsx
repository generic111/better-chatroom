import Message from "./Message";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../store/useConversation";
import { useEffect } from "react";

const MessageContainer = () => {

    const {selectedConversation, setSelectedConversation} = useConversation()
  
    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className="flex flex-col md:min-w-[500px]">
            <>
                <div className="bg-slate-50 px-4 py-2">
                    <span className="label-text">To:</span>{" "}
                    <span className="text-black">{!selectedConversation ? "No one selected": selectedConversation.fullName}</span>
                </div>
 
                {!selectedConversation ? (<div></div>) : 
                ( 
                    <div className="flex flex-col md:min-w-[500px]">
                        <Messages />
                        <MessageInput />
                    </div>
                )}
            </>
        </div>
    )
}

export default MessageContainer;