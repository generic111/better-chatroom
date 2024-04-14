import useSignout from "../../hooks/useSignout";

const SignOutButton = () => {
    
    const {loading, signout} = useSignout();
    return (
        <div className='mt-auto'>
        {!loading ? (
            <button className="btn" onClick = {signout} >Sign Out</button>
        ) : (
            <span className='loading loading-spinner'></span>
        )}
        </div>
    )
};

export default SignOutButton;