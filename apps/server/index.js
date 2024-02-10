import express from 'express';
import cors from 'cors';
import http from 'node:http'
import { Server as SocketIO } from 'socket.io';

const app = express();
const PORT = 4000
const HTTP_PORT = 4001

const server = http.createServer(app)

const socketIO = new SocketIO(PORT, {
  cors: {
    origin: 'http://localhost:5173',
  }
});
// const socketIO = new SocketIO(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//   }
// });

app.use(cors());

socketIO.on('connection', (socket) => {
  console.log(`user ${socket.id} just connected`);

  socket.on('message', (message) => {
    console.log(`user ${socket.id} just sent message: ${message}`);
    //sends the message to all connected clients
    socketIO.emit('messageResponse', message);
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} just disconnected`);
  });

  socket.on('hi', () => {
    console.log(`user ${socket.id} said hi`);
  })

  socket.on('log', (message) => {
    console.log('log:', message);
    socketIO.emit('logMessage', message);
  })
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello Dan!'
  });
});

server.listen(HTTP_PORT, () => {
  console.log(`Server listening on port ${HTTP_PORT}`);
});