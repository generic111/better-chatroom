import Messages from "./Messages";

const MessageContainer = () => {
    return (
        <div className="flex flex-col md:min-w-[500px]">
            <>
                <div className="bg-slate-500 px-4 py-2">
                    <span className="label-text">To:</span>{" "}
                    <span className="text-white">Darren Chong</span>
                </div>
                <Messages />
            </>
        </div>
    )
}

export default MessageContainer;