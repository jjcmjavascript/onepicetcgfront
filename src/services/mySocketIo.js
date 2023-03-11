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
    on: (event, callback) => {
      if (!onEventsList[event]) {
        onEventsList[event] = true;

        socket.on(event, callback);
        console.log('Event registered', event);
      }
    },
    emit: (event, data) => {
      if (!emitEventsList[event]) {
        emitEventsList[event] = true;

        socket.emit(event, data);

        console.log('Event Emited', event);
      }
    },
    disconnect: () => {
      socket.disconnect();
    },
  };
};
