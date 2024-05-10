import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";

const Conversation = ({conversation}) => {

    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const {onlinePeeps} = useSocketContext();
    const isOnline = onlinePeeps.includes(conversation._id);


    return (<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				    ${isSelected ? "bg-sky-500" : ""}`}
                onClick={() => setSelectedConversation(conversation)}> 
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src={`https://avatar.iran.liara.run/public/boy?username=${conversation.fullName}`} alt='user avatar' />
                    {/* <img src="https://avatar.iran.liara.run/public/boy" alt="avatar"/> */}
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className = 'flex gap-3 justify-between'>
                    <p className = 'font-bold text-black'>{conversation.username}</p>
                    <span className = 'text-xl'> 💀 </span>
                </div>
            </div>
        </div>
        
        <div className="divider my-0 py-0 h-1">

        </div>
    </>);
};

export default Conversation;