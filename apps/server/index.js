import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const app = express();
const PORT = 4000
let users = [];

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'https://admin.socket.io'],
    credentials: true
  }
});

instrument(io, {
  auth: false,
  mode: 'development'
});

app.use(cors());

io.on('connection', (socket) => {
  console.log(`user ${socket.id} just connected`);

  socket.on('message', (message) => {
    console.log(`user ${socket.id} just sent message: ${message}`);
    //sends the message to all connected clients
    io.emit('messageResponse', message);
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} just disconnected`);
    console.log('users before deconnection', users)
    users = users.filter((user) => user.socketId !== socket.id);
    console.log('users after deconnection', users)
    io.emit('usersResponse', users);
    socket.disconnect();
  });

  socket.on('newUser', (data) => {
    users.push(data);
    io.emit('newUserResponse', data)
    io.emit('usersResponse', users);
    console.log('users after new user registration', users)
  });

  socket.on('hi', () => {
    console.log(`user ${socket.id} said hi`);
  })

  socket.on('log', (message) => {
    console.log('log:', message);
    io.emit('logMessage', message);
  })
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello Dan!'
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});