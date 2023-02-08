import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const appUrl = process.env.REACT_APP_BACKEND_URL_SOCKET;

const defaultOptions = {
  reconnectionDelay: 200,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
};

export default function useSocket(url = '', options = defaultOptions) {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState({
    general: '/',
    duel: '',
  });

  useEffect(() => {
    const newSocket = io(`${appUrl}${url}`, options);

    setSocket(newSocket);

    return () => newSocket.close();
  }, [url]);

  const setActiveRooms = (room, roomName) => {
    setRooms({ ...rooms, [room]: roomName });
  };

  return { socket, rooms, setActiveRooms};
}
