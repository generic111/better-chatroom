const Message = () => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/boy" alt="avatar"/>
                </div>
            </div>

            <div className="chat-bubble text-white bg-blue-500">
                What is up?
            </div>
            <div className="chat-footer flex">12:45</div>
        </div>
    );
};

export default Message;