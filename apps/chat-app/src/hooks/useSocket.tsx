import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:4000';

function useSocket(): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create a new Socket.IO client when the component mounts
    const newSocket = io(SOCKET_SERVER_URL);

    // Set the socket state to the newly created socket
    setSocket(newSocket);

    // Close the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
}

export default useSocket;
