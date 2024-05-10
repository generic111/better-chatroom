
import Article from "./Article.jsx";
import useGetArticles from "../../../hooks/useGetArticles";
import useCreateArticle from "../../../store/useCreateArticle";
import useArticle from "../../../store/useArticle";

const Articles = () => {

    const {loading, articles} = useGetArticles();
    const {selectedArticle, setSelectedArticle} = useArticle();
    const {selectedCreateNewArticle, setSelectedCreateNewArticle} = useCreateArticle();
    // console.log("yahhh ", conversations);

    return (
        <div className="pt-5 flex flex-col w-1/5">
            <div className="flex justify-center mb-5">
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                onClick={() => {setSelectedCreateNewArticle(true); setSelectedArticle(null);}}>
                    Create Article
                </button>
            </div>

            <div className="divider my-0 py-0 h-1">

            </div>

            <div>

                {articles.map((article) => (
                    <Article key = {article._id} article={article}/>
                ))}
            </div>
 
        </div>
    );
};

export default Articles;