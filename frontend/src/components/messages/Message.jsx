import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";

const Message = ({message}) => {

    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();

    const whoMe = message.senderId === authUser._id;

    const chatClassDir = whoMe ? 'chat-end' : 'chat-start';

    return (
        <div className={`chat ${chatClassDir}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/boy" alt="avatar"/>
                </div>
            </div>

            <div className="chat-bubble text-white bg-blue-500">
                {message.content}
            </div>
            {/* <div className="chat-footer flex">12:45</div> */}
        </div>
    );
};

export default Message;