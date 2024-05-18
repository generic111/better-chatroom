import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";
import useSendDeleteRequest from '../../hooks/useSendDeleteRequest.js';


const Conversation = ({conversation}) => {

    const {selectedConversation, setSelectedConversation, setIsChatroom} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const {onlinePeeps} = useSocketContext();
    const isOnline = onlinePeeps.includes(conversation._id);
    const {loading, sendRequest} = useSendDeleteRequest();

    const handleClick = () => {

        console.log(conversation.username);
        sendRequest(conversation.username)
        setSelectedConversation(conversation);
        setIsChatroom(null);
    }
    return (<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				    ${isSelected ? "bg-sky-500" : ""}`}
                onClick={handleClick}> 
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src={`https://avatar.iran.liara.run/public/boy?username=${conversation.fullName}`} alt='user avatar' />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className = 'flex gap-3 justify-between'>
                    <p className = 'font-bold text-black'>{conversation.username}</p>
                    {/* <span className = 'text-xl'> 💀 </span> */}

                        <button className={"hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={handleClick}>
                            💀
                        </button>
               
                </div>
            </div>
        </div>
        
        <div className="divider my-0 py-0 h-1">

        </div>
    </>);
};

export default Conversation;