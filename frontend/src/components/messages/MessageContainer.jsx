import Message from "./Message";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
    return (
        <div className="flex flex-col md:min-w-[500px]">
            <>
                <div className="bg-slate-50 px-4 py-2">
                    <span className="label-text">To:</span>{" "}
                    <span className="text-black">Darren Chong</span>
                </div>
                <Messages />
                <MessageInput />
            </>
        </div>
    )
}

export default MessageContainer;