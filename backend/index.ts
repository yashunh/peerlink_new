import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import jwt from "jsonwebtoken"
import userRouter from './routes/userRouter';
import { config } from "dotenv"
import path from "path"
import { getMessage, getMessageWithUser, sendMessage } from './messages';
import cors from "cors"

config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const httpServer = createServer(app);
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
app.use(express.json())
app.use(userRouter)

let users = new Map<number,string>()

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
    socket.emit("auth error",err)
  }
}).on('connection', (socket) => {
  let roomName = "";
  const userId = socket.data.userId
  users.set(userId,socket.id)
  socket.on('disconnect', () => {
    users.delete(userId)
    console.log('user disconnected');
  });

  socket.on("send message", async(receiverId: number, message: string) => {
    const result = await sendMessage(userId, receiverId, message)
    if(users.has(receiverId)){
      const sockets = await io.fetchSockets()
      for(let i of sockets){
        if(i.id == users.get(receiverId)){
          i.emit("recieve message",result.rows,userId)
          socket.emit("message send",message)
        }
      }
    }
  })

  socket.on("get message", () => {
    getMessage(userId)
  })

  socket.on("get message with user", (userId2) => {
    getMessageWithUser(userId, userId2)
  })

  socket.on("join room", (userId2: number) => {
    roomName = userId < userId2 ? userId.toString() + "x" + userId2.toString() : userId2.toString() + "x" + userId.toString()
    socket.join(roomName)
  })
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});