import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";

const Conversation = ({conversation}) => {

    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const {onlinePeeps} = useSocketContext();
    const isOnline = onlinePeeps.includes(conversation._id);


    return (<>
        <div className={"flex gap-2 items-center rounded -2 py-1 cursor-pointer"}
                onClick={() => setSelectedConversation(conversation)}> 
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/boy" alt="avatar"/>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className = 'flex gap-3 justify-between'>
                    <p className = 'font-bold text-black'>{conversation.fullName}</p>
                    <span className = 'text-xl'> 💀 </span>
                </div>
            </div>
        </div>
        
        <div className="divider my-0 py-0 h-1">

        </div>
    </>);
};

export default Conversation;