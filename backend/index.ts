import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import jwt from "jsonwebtoken"
import userRouter from './routes/userRouter';

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
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});