
import Article from "./Article.jsx";
import useGetArticles from "../../../hooks/useGetArticles";
import useCreateArticle from "../../../store/useCreateArticlePage.js";
import useArticle from "../../../store/useArticle";
import useListenArticles from "../../../hooks/useListenArticles.js";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Articles = () => {

    const {loading, articles} = useGetArticles();
    const {selectedArticle, setSelectedArticle} = useArticle();
    const {selectedCreateNewArticle, setSelectedEditArticle, setSelectedCreateNewArticle} = useCreateArticle();
    // console.log("yahhh ", conversations);
    const {authUser} = useAuthContext();

    useListenArticles();

    const handleClick = () => {
        // console.log(authUser);
        if (authUser.muted) {
            toast.error("You are muted and cannot create articles");
            return;
        }

        setSelectedCreateNewArticle(true); 
        setSelectedArticle(null); 
        setSelectedEditArticle(null);
    }

    return (
        <div className="pt-5 flex flex-col w-1/5">
            <div className="flex justify-center mb-5">
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                onClick={handleClick}>
                    Create Article
                </button>
            </div>

            <div className="divider my-0 py-0 h-1">

            </div>

            <div>

                {articles.toReversed().map((article) => (
                    <Article key = {article._id} article={article}/>
                ))}
            </div>
 
        </div>
    );
};

export default Articles;