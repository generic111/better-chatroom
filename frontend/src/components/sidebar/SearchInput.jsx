import { IoSearchSharp } from 'react-icons/io5';
import useSendFriendRequest from '../../hooks/useSendFriendRequest.js';

const SearchInput = () => {
    const {loading, sendRequest} = useSendFriendRequest();
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest(e.target.username.value)
    };
    return (
        
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input type='text' placeholder="Find friends" className="input input-bordered rounded-full" name="username"/>
            <button type="submit" className="btn btn-circle">
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
                
        </form> 
    );
};

export default SearchInput;