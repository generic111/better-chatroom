import { set } from 'mongoose';
import { create } from 'zustand';

const useUsers = create((set) => ({
    users : [],
    setUsers : (users) => {
        // console.log(messages);
        set({users})
    },
}))

export default useUsers;