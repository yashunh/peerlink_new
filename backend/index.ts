import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import jwt from "jsonwebtoken"
import userRouter from './routes/userRouter';
import { config } from "dotenv"
import path from "path"
import sendMessage from './sendMessage';
import getMessage from './getMessage';
config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(express.json())
app.use(userRouter)

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on("send message", ({receiverId,senderId,message}:{
      receiverId: number, senderId:number, message:string
    })=>{
      sendMessage(receiverId,senderId,message)
    })

    socket.on("get message", ({userId}:{
      userId: number
    })=>{
      getMessage(userId)
    })
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});