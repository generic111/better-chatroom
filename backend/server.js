import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"; 

dotenv.config(); 


const PORT = process.env.PORT || 5000;

app.use(cors());


app.use(express.json()); // middleware parse json payloads form req body
app.use(cookieParser()); // middleware to parse cookies from req headers

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}.`);
});
