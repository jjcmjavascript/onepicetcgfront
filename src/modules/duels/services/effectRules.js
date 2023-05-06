export const isCharacter = ({ card }) => {
  return card && card.type === 'Character';
};

export const isLeader = ({ card }) => {
  return card && card.type === 'Leader';
};

export const isStage = ({ card }) => {
  return card && card.type === 'Stage';
};

export const isEvent = ({ card }) => {
  return card && card.type === 'Event';
};

export const isDon = ({ card }) => {
  return card && card.type === 'Don';
};

export const attack = ({ board, game, card }) => {
  const currentTurnPlays = game.currentPlays;
  const canPhase = phase({ board, game, params: { phase: 'main' } });
  const play = currentTurnPlays.find(
    (play) =>
      play.card && play.card.uuid === card.uuid && play.type === 'attack'
  );

  return canPhase && game.mode === '' && !play;
};

export const hasAvaibleCost = ({ board, params }) => {
  const { costs } = board;
  const { quantity } = params;

  return costs.filter((cost) => !cost.rested).length >= quantity;
};

export const canAddAtkFromDon = ({ don, game }) => {
  return (
    don &&
    !don.rested &&
    phase({ game, params: { phase: 'main' } }) &&
    !game.mode
  );
};

export const canShowConfirmButton = ({ activeCards, game }) => {
  const modes = {
    'select:character&&leader': ['leader', 'character'],
    'select:character:in:characterZone': ['character'],
    'select:character:in:hand': ['hand'],
    'select:character:to:replace': ['character'],
  };

  const currentModeSelected = modes[game.mode];

  return (
    currentModeSelected &&
    Object.values(currentModeSelected).some((name) =>
      Boolean(activeCards[name])
    )
  );
};

export const phase = ({ game, params }) => game.currentPhase === params.phase;

export const oncePerTurn = ({ game, effectName }) => {
  const currentTurnPlays = game.currentPlays;

  const result = !currentTurnPlays.find((play) => {
    return play.effectName === effectName;
  });

  return result;
};

export const rest = ({ card }) => {
  return card && !card.rested;
};

export const characterSelect = ({ game, card }) => {
  return rest({ card }) && game.mode === 'select:character:in:characterZone';
};

export const canPlayCard = ({ card, board, game }) => {
  const canPhase = phase({ game, params: { phase: 'main' } });
  const canCost =
    card && hasAvaibleCost({ board, params: { quantity: card.cost } });
  const canPlay = !game.mode && canPhase && canCost;

  return canPlay;
};

export const canPlayCardCharacter = ({ activeCards, board, game }) => {
  const card = activeCards.hand;

  return (
    card &&
    isCharacter({ card }) &&
    canPlayCard({ card, board, game }) &&
    card.type === 'Character' &&
    board.characters.length < 5
  );
};

export const canReplaceCharacterForPlay = ({ activeCards, board, game }) => {
  return (
    isCharacter({ card: activeCards.hand }) &&
    canPlayCard({ card: activeCards.hand, board, game }) &&
    board.characters.length === 5
  );
};

export const canActiveEffect = () => {};

export const donAttached = ({ currentCard, params }) => {
  return currentCard && currentCard.overCards.length >= params.quantity;
};

export const mode = ({ game, params }) => game.mode === params.mode;

export const hasExactCharacters = ({ board, params }) => {
  return board.characters.length === params.quantity;
};
