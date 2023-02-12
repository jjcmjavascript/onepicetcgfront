import constans from './constants';

export const RockScissorsPaperStart = () => {
  return {
    type: constans.ROCK_SCISSORS_PAPER_START,
    payload: {},
  };
};

export const RockScissorsPaperEnd = () => {
  return {
    type: constans.ROCK_SCISSORS_PAPER_END,
    payload: {},
  };
};

export const RockScissorsPaperCancel = () => {
  return {
    type: constans.ROCK_SCISSORS_PAPER_CANCEL,
    payload: {},
  };
};

export const RockScissorsPaperChoice = (socket, choice) => {
  return {
    type: constans.ROCK_SCISSORS_PAPER_CHOICE,
    payload: {
      choice,
    },
  };
};

export const RockScissorsPaperResult = (result) => {
  return {
    type: constans.ROCK_SCISSORS_PAPER_RESULT,
    payload: {
      result,
    },
  };
};

export const emitDuelRemoveLife = (socket, payload = {}) => {
  socket.emit(constans.DUEL_REMOVE_LIFE, { life: 1 });
};

// LISTENER
export const onDuelConnected = (socket, cb) => {
  socket.on(constans.DUEL_CONNECTED, (data) => {
    cb(data);
  });
};
