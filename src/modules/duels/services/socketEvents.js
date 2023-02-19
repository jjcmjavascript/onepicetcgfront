import constans from './constants';

export const emitRockScissorsPaperChoice = (socket, payload) => {
  socket.emit(constans.GAME_ROCK_PAPER_SCISSORS_CHOISE, payload);
};

export const emitDeckSelected = (socket, payload) => {
  socket.emit(constans.GAME_DECK_SELECTED, payload);
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

export const onDuelCanceled = (socket, cb) => {
  socket.on(constans.DUEL_CANCELED, (data) => {
    cb(data);
  });
};
