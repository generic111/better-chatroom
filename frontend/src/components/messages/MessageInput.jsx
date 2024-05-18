import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../store/useConversation";

const MessageInput = () => {

    const [message, setMessage] = useState("");
    const {loading, sendMessage, sendChatMessage} = useSendMessage();
    const {selectedConversation, isChatroom} = useConversation();

    const submitFunc = async (e) => {
        e.preventDefault();
        if (!message) return;
        

        
        if (isChatroom) {
            console.log(isChatroom);
            await sendChatMessage(message, selectedConversation._id);
            setMessage("");
            return;
        }

        await sendMessage(message);

        setMessage("");
    }

    return (
        <form className = 'px-4 my-3' onSubmit = {submitFunc}>
            <div className = 'w-full relative'>
                <input 
                    type = 'text' 
                    className = 'border text-sm rounded-lg block w-full p-2.5'
                    placeholder = 'Send a message'
                    value = {message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type = 'submit' className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <BsSend/>
                </button>
            </div>
        </form>
    )
    
}

export default MessageInput