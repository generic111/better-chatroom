import ArticleContainer from "../../components/knowledgeRepo/articles/ArticleContainer.jsx";
import Articles from "../../components/knowledgeRepo/articles/Articles.jsx";
import NavBar from "../homepage/NavBar.jsx";

const AccountProfile = () => {
    return (
        <div className="p-5 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-25 h-full"> 

            <div className="flex w-full h-full">
                <Articles />
                <ArticleContainer />
                
            </div>           
        </div>
    );
};

export default Forum;