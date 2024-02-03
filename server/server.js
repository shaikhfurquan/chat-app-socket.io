import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { Server } from 'socket.io';
import http from 'http';
dotenv.config()


const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 2500

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "PUT"]
    }
})

io.on("connection", (socket) => {
    // console.log(socket.id);

    socket.on("join_room" , (data) =>{
        // console.log("user - join room" , data);
        socket.join(data)
        console.log(`User ID : ${socket.id} join room : ${data}`);
    })


    socket.on("send_message" , (data) =>{
        console.log("send message data" , data);
    })
    

    socket.on("disconnect", () => {
        console.log("User disconnected...", socket.id);
    })
})

//express middleware
app.use(cors())


server.listen(PORT, () => console.log(`Server is running on ${PORT}`))