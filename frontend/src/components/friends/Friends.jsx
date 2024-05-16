import Conversations from "../sidebar/Conversations.jsx";
import SignOutButton from "../sidebar/SignOutButton.jsx";
import SearchInput from "../sidebar/SearchInput.jsx";
import DeleteFriend from "../sidebar/DeleteFriend";
import { Link } from "react-router-dom";


// import Article from "./Article.jsx";
import useGetArticles from "../../hooks/useGetArticles";
import useCreateArticle from "../../store/useCreateArticlePage.js";
import useArticle from "../../store/useArticle";
import useListenArticles from "../../hooks/useListenArticles.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";


const Friends = () => {

    const {loading, articles} = useGetArticles();
    const {selectedArticle, setSelectedArticle} = useArticle();
    const {selectedCreateNewArticle, setSelectedEditArticle, setSelectedCreateNewArticle} = useCreateArticle();
    // console.log("yahhh ", conversations);
    const {authUser} = useAuthContext();

    useListenArticles();

    const handleClick = () => {
        console.log(authUser);
        if (authUser.muted) {
            toast.error("You are muted and cannot create articles");
            return;
        }

        setSelectedCreateNewArticle(true); 
        setSelectedArticle(null); 
        setSelectedEditArticle(null);
    }


    return (
        <div className="border-r border-slate-500 p-4 flex flex-col"> 
            <SearchInput />

            {/* <div className="flex justify-center mb-5">
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                onClick={handleClick}>
                    Create Conversation
                </button>
            </div>
            <div className="flex justify-center mb-5">
                <Link to="/signin" className="text-blue-600">
                    Don't have an account? Sign Up
                </Link>
            </div> */}

            <div className = 'divider px-3'></div>
            <Conversations /> 
            <SignOutButton /> 
        </div>
    );
};

export default Friends;