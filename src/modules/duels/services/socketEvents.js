import constans from './constants';

export const emitRockScissorsPaperChoice = (socket, choice) => {
  console.log('emitRockScissorsPaperChoice', choice);
  socket.emit(constans.GAME_ROCK_PAPER_SCISSORS_CHOISE, { choice });
};

// LISTENER
export const onRockScissorPaperStart = (socket, cb) => {
  socket.on(constans.GAME_ROCK_SCISSORS_PAPER_START, (data) => {
    cb(data);
  });
};

export const onDuelConnected = (socket, cb) => {
  socket.on(constans.GAME_ROOM_JOIN, (data) => {
    cb(data);
  });
};

export const onRockScissorPaperResult = (socket, cb) => {
  socket.on(constans.GAME_ROCK_SCISSORS_PAPER_RESULT, (data) => {
    cb(data);
  });
};
