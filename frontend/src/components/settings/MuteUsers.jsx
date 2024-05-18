import useGetUsers from "../../hooks/useGetUsers.js";
import User from "./User.jsx";

const MuteUsers = () => {

    const {loading, users} = useGetUsers();
    // console.log("yahhh ", conversations);

    return (
        <div className="py-2 flex flex-col mt-10">

            <table className="table-fixed mt-10">
                <thead className="mt-10">
                    <tr>
                        <th className="w-1/3">
                            <div className="flex justify-start mb-10">
                                <label className="font-bold text-2xl text-black">username</label>
                            </div>
                        </th>
                        <th className="w-1/3">

                        <div className="flex justify-start mb-10">
                            <label className="font-bold text-2xl text-black">role</label>
                        </div>

                        </th>
                        <th className="w-1/3">
                            <div className="flex justify-start mb-10">
                                <label className="font-bold text-2xl text-black">Mute</label>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <User key = {user._id} user={user}/>
                    ))}
                </tbody>
            </table>
 
        </div>
    );
};

export default MuteUsers;