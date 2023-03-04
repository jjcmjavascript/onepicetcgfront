import constans from './constants';

export const emitRockScissorsPaperChoice = (socket, payload) => {
  socket.emit(constans.GAME_ROCK_PAPER_SCISSORS_CHOISE, payload);
};

export const emitDeckSelected = (socket, payload) => {
  socket.emit(constans.GAME_DECK_SELECTED, payload);
};

// LISTENER
export const onRockScissorPaperStart = (socket, cb) => {
  socket.on(constans.GAME_ROCK_SCISSORS_PAPER_START, (payload) => {
    cb(payload);
  });
};

export const onDuelConnected = (socket, cb) => {
  socket.on(constans.GAME_ROOM_JOIN, (payload) => {
    cb(payload);
  });
};

export const onRockScissorPaperResult = (socket, cb) => {
  socket.on(constans.GAME_ROCK_SCISSORS_PAPER_RESULT, (payload) => {
    cb(payload);
  });
};

export const onDuelCanceled = (socket, cb) => {
  socket.on(constans.DUEL_CANCELED, (payload) => {
    cb(payload);
  });
};

export const onGameBoardStateChange = (socket, callback) => {
  socket.on(constans.GAME_BOARD_STATE, (payload) => {
    callback(payload);
  });
};

export const onGameStateChange = (socket, callback) => {
  socket.on(constans.GAME_STATE, (payload) => {
    callback(payload);
  });
}
