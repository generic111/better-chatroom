
import Chat from "./Chat.jsx";
import NavBar from "./NavBar.jsx";

const Home = () => {
    return (
        // <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        // <div className="w-screen h-screen justify-center item-center">
        // <div className='flex justify-center item-center rounded-lg overflow-hidden bg-gray-400 bg-clip-padding 
        //     backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className="w-screen h-screen py-20 flex items-center justify-center mx-autobg-gray-300 rounded-md
        shadow-md backdrop-filter backdrop-blur-lg bg-opacity-50">
            {/* <div className="flex justify-center item-center bg-gray-300 rounded-md
                shadow-md backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-100"> */}

            {/* <NavBar /> */}


            {/* <div className="flex py-20 justify-center item-center"> */}
                <Chat />
            {/* </div> */}
        </div>
    );
};

export default Home;