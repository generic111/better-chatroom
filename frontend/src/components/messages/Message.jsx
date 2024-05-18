import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";

const Message = ({message}) => {

    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();

    const whoMe = message.senderId === authUser._id;

    const bubbleColour = whoMe ? 'bg-blue-500' : ""
    const profilePic = whoMe ? `https://avatar.iran.liara.run/username?username=${authUser.fullName}` : `https://avatar.iran.liara.run/username?username=${message?.senderName}`;

    const chatClassDir = whoMe ? 'chat-end' : 'chat-start';

    return (
        <div className={`chat ${chatClassDir}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt='user avatar' />
                </div>
            </div>
            <div className="chat-name">
                {whoMe ? authUser.username : message.senderName}    
            </div>

            <div className={`chat-bubble text-white ${bubbleColour}`}>
                {message.content}
            </div>
            {/* <div className="chat-footer flex gap-1">12:45</div> */}
        </div>
    );
};

export default Message;