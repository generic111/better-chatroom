import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect to MONGODB");
    } catch (error) {
        console.log("error connecting to MONGODB", error.message);
    }
};

export default connectToMongoDB;