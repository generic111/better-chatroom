import ArticleContainer from "../../components/knowledgeRepo/articles/ArticleContainer.jsx";
import Articles from "../../components/knowledgeRepo/articles/Articles.jsx";
import NavBar from "../homepage/NavBar.jsx";

const Forum = () => {
    return (
        <div className="p-5"> 

            <div className="flex w-full h-full">
                <Articles />
                <ArticleContainer />
                
            </div>           
        </div>
    );
};

export default Forum;