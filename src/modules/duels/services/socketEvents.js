import constants from './constants';

export const emitRockScissorsPaperChoice = (socket, payload) => {
  socket.emit(constants.GAME_ROCK_PAPER_SCISSORS_CHOISE, payload);
};

export const emitDeckSelected = (socket, payload) => {
  socket.emit(constants.GAME_DECK_SELECTED, payload);
};

export const emitMulligan = (socket, payload) => {
  socket.emit(constants.GAME_MULLIGAN, payload);
}

// LISTENER
export const onRockScissorPaperStart = (socket, cb) => {
  socket.on(constants.GAME_ROCK_SCISSORS_PAPER_START, (payload) => {
    cb(payload);
  });
};

export const onDuelConnected = (socket, cb) => {
  socket.on(constants.GAME_ROOM_JOIN, (payload) => {
    cb(payload);
  });
};

export const onRockScissorPaperResult = (socket, cb) => {
  socket.on(constants.GAME_ROCK_SCISSORS_PAPER_RESULT, (payload) => {
    cb(payload);
  });
};

export const onDuelCanceled = (socket, cb) => {
  socket.on(constants.DUEL_CANCELED, (payload) => {
    cb(payload);
  });
};

export const onGameBoardStateChange = (socket, callback) => {
  socket.on(constants.GAME_BOARD_STATE, (payload) => {
    callback(payload);
  });
};

export const onGameStateChange = (socket, callback) => {
  socket.on(constants.GAME_STATE, (payload) => {
    callback(payload);
  });
}

export const onMulliganPhase = (socket, callback) => {
  socket.on(constants.GAME_PHASES_MULLIGAN, (payload) => {
    console.log('onMulliganPhase', payload);
    callback(payload);
  });
}

export const onMulligan = (socket, callback) => {
  socket.on(constants.GAME_MULLIGAN, (payload) => {
    callback(payload);
  });
}

