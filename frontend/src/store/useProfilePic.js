import { set } from 'mongoose';
import { create } from 'zustand';

const useProfilePic = create((set) => ({
    profilePic : null,
    setProfilePic : (profilePic) => set({profilePic}),
}))

export default useProfilePic;