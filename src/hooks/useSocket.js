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

const SOCKET_GENERAL_URL = '/';
const SOCKET_DUEL_URL = '/duel';

export default function useSocket(options = defaultOptions) {
  const [sockets, setSockets] = useState({
    [SOCKET_GENERAL_URL]: null,
    [SOCKET_DUEL_URL]: null,
  });

  const [rooms, setRooms] = useState({
    [SOCKET_GENERAL_URL]: null,
    [SOCKET_DUEL_URL]: null,
  });

  const initSocket = (socketUrl) => {
    if (sockets[socketUrl]) return sockets[socketUrl];

    const newSocket = io(`${appUrl}`, options);

    setSockets((prev) => ({ ...prev, [socketUrl]: newSocket }));
  };

  const initDuelSocket = () => {
    if (sockets[SOCKET_DUEL_URL]) return sockets[SOCKET_DUEL_URL];

    const newSocket = io(`${appUrl}${SOCKET_DUEL_URL}`, options);

    setSockets((prev) => ({ ...prev, [SOCKET_DUEL_URL]: newSocket }));
  };

  const joinRoom = (socket, room) => {
    setRooms((prev) => ({ ...prev, [socket]: room }));
  };

  useEffect(() => {
    initSocket(SOCKET_GENERAL_URL);
  }, [defaultOptions]);

  return {
    get duelSocket() {
      return sockets[SOCKET_DUEL_URL];
    },
    get duelRoom() {
      return rooms[SOCKET_DUEL_URL];
    },
    sockets,
    rooms,
    joinRoom,
    initSocket,
    initDuelSocket,
    SOCKET_GENERAL_URL,
    SOCKET_DUEL_URL,
  };
}
