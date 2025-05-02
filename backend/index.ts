import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import jwt from "jsonwebtoken"
import userRouter from './routes/userRouter';
import { config } from "dotenv"
import path from "path"
import { getMessage, getMessageWithUser, sendMessage } from './messages';

config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(express.json())
app.use(userRouter)


io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token
    const userId = jwt.verify(token, process.env.JWT_SECRET || "")
    if (!userId) {
      throw "Wrong Token"
    }
    socket.data.userId = userId
    next()
  } catch (err) {
    // sending error
  }
}).on('connection', (socket) => {
  let roomName = ""
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("send message", (receiverId: number, senderId: number, message: string) => {
    sendMessage(receiverId, senderId, message)
  })

  socket.on("get message", (userId: number) => {
    getMessage(userId)
  })

  socket.on("get message with user", (userId: number, userId2) => {
    getMessageWithUser(userId, userId2)
  })

  socket.on("join room", (userId: number, userId2: number) => {
    roomName = userId < userId2 ? userId.toString() + userId2.toString() : userId2.toString() + userId.toString()
    socket.join(roomName)
  })
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});