export const attack = ({ board, game, card }) => {
  const currentTurnPlays = game.currentPlays;
  const canPhase = phase({ board, game, phase: 'main' });

  return (
    canPhase &&
    game.mode === '' &&
    !currentTurnPlays.find(
      (play) =>
        play.card && play.card.uuid === card.uuid && play.type === 'attack'
    )
  );
};

export const costs = ({ board, quantity }) => {
  const { costs } = board;

  return costs.filter((cost) => !cost.rested).length >= quantity;
};

export const addAtkFromDon = ({ don, board, game }) => {
  return (
    don &&
    !don.rested &&
    board.characters.length > 0 &&
    phase({ game, phase: 'main' })
  );
};

export const phase = ({ game, phase }) => game.currentPhase === phase;

export const oncePerTurn = ({ board, game, effectName }) => {
  const currentTurnPlays = game.currentPlays;

  return !currentTurnPlays.find((play) => {
    return play.type === effectName;
  });
};

export const rest = ({ card }) => {
  return card && !card.rested;
};

export const donSelect = ({ game, card }) => {
  return rest({ card }) && game.mode === 'select:don;phase:main;quantity:all';
};

export const characterSelect = ({ game, card }) => {
  return rest({ card }) && game.mode === 'select:character';
};
