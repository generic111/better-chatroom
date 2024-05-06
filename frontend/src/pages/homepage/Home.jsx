
import Chat from "./Chat.jsx";
import NavBar from "./NavBar.jsx";

const Home = () => {
    return (
        <div className="w-screen h-screen">

            <NavBar />


            <div className="flex py-20 justify-center item-center">
                <Chat />
            </div>

            
        </div>
    );
};

export default Home;