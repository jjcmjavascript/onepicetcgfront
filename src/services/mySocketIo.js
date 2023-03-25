import io from 'socket.io-client';

const defaultOptions = {
  reconnectionDelay: 200,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
};

export default (socketUrl, options = defaultOptions) => {
  const socket = io(`${socketUrl}`, options);
  const onEventsList = {};
  const emitEventsList = {};

  return {
    get id() {
      return socket.id;
    },
    on: (event, callback) => {
      if (!onEventsList[event] && event && callback) {
        onEventsList[event] = true;
        socket.on(event, callback);
      }
    },
    emit: (event, data) => {
      if (!emitEventsList[event] && event) {
        emitEventsList[event] = true;
        socket.emit(event, data);
      }
    },
    close: () => {
      socket.close();
    },
    disconnect: () => {
      socket.disconnect();
    },
  };
};
