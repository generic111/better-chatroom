import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";


const Chat = ({chat}) => {

    const {selectedConversation, setSelectedConversation, setIsChatroom} = useConversation();

    const isSelected = selectedConversation?._id === chat._id;

    const handleClick = () => {
        setSelectedConversation(chat);
        setIsChatroom(true);
    }

    return (<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				    ${isSelected ? "bg-sky-500" : ""}`}
                onClick={handleClick}> 
            <div>
                <div className="w-12 rounded-full">
                    <img src={`https://avatar.iran.liara.run/username?username=${chat.username}`} alt='user avatar' />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className = 'flex gap-3 justify-between'>
                    <p className = 'font-bold text-black'>{chat.username}</p>
                    <span className = 'text-xl'> 💀 </span>
                </div>
            </div>
        </div>
        
        <div className="divider my-0 py-0 h-1">

        </div>
    </>);
};

export default Chat;