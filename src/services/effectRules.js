const playAttack = 'play:attack';
const phaseMain = 'game:phase:main';
const gameModeSelectCharacter = 'game:mode:select:character';
const gameModeSelectCharacterLeader = 'game:mode:select:character:leader';

export const attack = ({ board, game, card }) => {
  const currentTurnPlays = game.currentPlays;
  const canPhase = phase({ board, game, phase: 'main' });
  const play = currentTurnPlays.find(
    (play) =>
      play.card && play.card.uuid === card.uuid && play.type === 'attack'
  );

  return canPhase && game.mode === '' && !play;
};

export const costs = ({ board, quantity }) => {
  const { costs } = board;

  return costs.filter((cost) => !cost.rested).length >= quantity;
};

export const canAddAtkFromDon = ({ don, game }) => {
  return don && !don.rested && phase({ game, phase: 'main' }) && !game.mode;
};

export const canShowSelectToAddAtkFromDon = ({ activeCards, game }) => {
  return (
    (activeCards.leader || activeCards.character) &&
    game.mode === 'select:character:leader'
  );
};

export const phase = ({ game, phase }) => game.currentPhase === phase;

export const oncePerTurn = ({ game, effectName }) => {
  const currentTurnPlays = game.currentPlays;

  return !currentTurnPlays.find((play) => {
    return play.type === effectName;
  });
};

export const rest = ({ card }) => {
  return card && !card.rested;
};

export const characterSelect = ({ game, card }) => {
  return rest({ card }) && game.mode === 'select:character';
};

export const canPlayCard = ({ card, board, game }) => {
  const canPhase = phase({ game, phase: 'main' });
  const canCost = card && costs({ board, quantity: card.cost });
  const canPlay = !game.mode && canPhase && canCost;

  return canPlay;
};

export const canActiveEffect = () => {};
