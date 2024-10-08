import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
// import { disconnect } from 'process';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:["http://localhost:5173"],
        methods: ['GET', 'POST']
    }
});


export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

export const getAll = () => {
    var values = Object.keys(userSocketMap).map(function(key){
        return userSocketMap[key];
    });
    return values;
} 

const userSocketMap = {}; 

io.on('connection', (socket) => {
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlinePeeps", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlinePeeps", Object.keys(userSocketMap));
    })

});

// io.on('acceptFriendRequest', (data) => {


export {app, io, server}