import constans from '../constants';

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

export const RockScissorsPaperChoice = (choice) => {
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
