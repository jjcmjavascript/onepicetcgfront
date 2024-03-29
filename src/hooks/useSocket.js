import { useEffect, useState } from 'react';
import mySocketIo from '../services/mySocketIo';

const appUrl = import.meta.env.VITE_APP_BACKEND_URL_SOCKET;

const SOCKET_GENERAL_URL = '/';
const SOCKET_DUEL_URL = 'duel';

export default function useSocket(options = null) {
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

    const newSocket = mySocketIo(`${appUrl}`, options);

    setSockets((prev) => ({ ...prev, [socketUrl]: newSocket }));
  };

  const stopDuelSocket = () => {
    if (!sockets[SOCKET_DUEL_URL]) return;

    sockets[SOCKET_DUEL_URL].disconnect();

    setSockets((prev) => ({ ...prev, [SOCKET_DUEL_URL]: null }));
  };

  const initDuelSocket = () => {
    if (sockets[SOCKET_DUEL_URL]) return sockets[SOCKET_DUEL_URL];

    const newSocket = mySocketIo(`${appUrl}${SOCKET_DUEL_URL}`, options);

    setSockets((prev) => ({ ...prev, [SOCKET_DUEL_URL]: newSocket }));
  };

  const joinRoom = (socket, room) => {
    setRooms((prev) => ({ ...prev, [socket]: room }));
  };

  const disconectSocket = (socketUrl) => {
    if (!sockets[socketUrl]) return;

    sockets[socketUrl].disconnect();

    setSockets((prev) => ({ ...prev, [socketUrl]: null }));
  };

  useEffect(() => {
    initSocket(SOCKET_GENERAL_URL);
  }, [options]);

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
    disconectSocket,
    stopDuelSocket,
  };
}
