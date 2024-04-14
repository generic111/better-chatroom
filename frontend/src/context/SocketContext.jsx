import { createContext, useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlinePeeps, setOnlinePeeps] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:8000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			socket.on("getOnlinePeeps", (peeps) => {
				setOnlinePeeps(peeps);
			});

			return () => socket.close();
        
        // close socket if not authenticated 
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlinePeeps }}>
        {children}
        </SocketContext.Provider>;
};