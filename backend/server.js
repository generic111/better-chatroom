import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import friendRoutes from "./routes/friends.routes.js"
import articleRoutes from "./routes/article.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"; 

const __dirname = path.resolve();

dotenv.config(); 


const PORT = process.env.PORT || 5000;

app.use(cors());


app.use(express.json()); // middleware parse json payloads form req body
app.use(cookieParser()); // middleware to parse cookies from req headers

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/chat", chatRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}.`);
});
