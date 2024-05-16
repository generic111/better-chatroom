
import Comment from "./comment";
import useGetComments from "../../../hooks/useGetComments";
import useListenComments from "../../../hooks/useListenComments";

const Comments = () => {

    const {comments, loading } = useGetComments();
    useListenComments();
    // console.log(messages);

    return (
        <div className="px-4 flex-1 my-10 pb-10">
            { !loading && comments.length > 0 && comments.toReversed().map((comment) => (
                <Comment key = {comment._id} comment = {comment} />
            ))}
        </div>
    );
};

export default Comments;