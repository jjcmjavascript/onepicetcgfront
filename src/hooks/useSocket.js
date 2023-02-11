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
const GENERAL = '/';
const DUEL = '/duel';

export default function useSocket(options = defaultOptions) {
  const [sockets, setSockets] = useState({
    [GENERAL]: null,
    [DUEL]: null,
  });

  const initSocket = (url) => {
    if (sockets[url]) return sockets[url];

    const newSocket = io(`${appUrl}`, options);

    setSockets((prev) => ({ ...prev, [url]: newSocket }));
  };

  useEffect(() => {
    initSocket(GENERAL);
  }, [defaultOptions]);

  return { sockets };
}
