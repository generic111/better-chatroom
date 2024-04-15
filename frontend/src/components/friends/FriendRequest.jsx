import { useSocketContext } from "../../context/SocketContext";
import useProcessFriendRequest from "../../hooks/useProcessFriendRequest";
import useConversation from "../../store/useConversation";


const FriendRequest = ({request}) => {
    // const {selectedConversation, setSelectedConversation} = useConversation();
    const {loading, processRequest} = useProcessFriendRequest();

    const sleep = ms => new Promise(r => setTimeout(r, ms));
    return (<>
        <div className={"flex gap-2 items-center rounded -2 py-1 cursor-pointer"}> 
            <div>
                <div className="w-12 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/boy" alt="avatar"/>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className = 'flex gap-3 justify-between'>
                    <p className = 'font-bold text-black'>{request.username}</p>
                    <span className = 'text-xl'> 💀 </span>
                </div>

                <div className = 'flex gap-3 justify-between'>
                    <button className="btn" onClick={() => {processRequest(true, request.username); sleep(10); window.location.reload(); }}>Accept</button>
                    <button className="btn" onClick={() => {processRequest(false, request.username); sleep(10); window.location.reload(); }}>Reject</button>
                    {/* <button className="btn" onClick={() => {processRequest(true, request.username)}}>Accept</button>
                    <button className="btn" onClick={() => {processRequest(false, request.username)}}>Reject</button> */}
                </div>
            </div>
        </div>
        
        <div className="divider my-0 py-0 h-1">

        </div>
    </>);

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

export default FriendRequest;