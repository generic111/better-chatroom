
import { Navigate, Route, Routes, useActionData } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';


import Chat from "./Chat.jsx";
import NavBar from "./NavBar.jsx";
import Forum from "../forum/ForumHome.jsx";


const Home = () => {
    const {authUser} = useAuthContext();
    return (
        <div>
            <div className="w-screen h-screen">

                {/* <NavBar /> */}


                <div className="flex py-20 justify-center item-center">
                    <Chat />
                </div>
            </div>
        </div>
    );
};

export default Home;