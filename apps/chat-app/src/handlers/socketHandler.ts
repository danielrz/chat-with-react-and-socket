// returns a socket.io singleton socket instance
import io, {Socket} from 'socket.io-client';

let socket: Socket;
export const getSocket = () => {
  console.log('getSocket', socket);
  if (!socket) {
    socket = io('http://localhost:4000');
  }
  return socket;
};  