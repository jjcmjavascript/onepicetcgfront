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

export const costs = ({ board, quantity }) => {
  const { costs } = board;

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

export const canShowSelectToAddAtkFromDon = ({ activeCards, game }) => {
  return (
    (activeCards.leader || activeCards.character) &&
    game.mode === 'select:character:leader'
  );
};

export const phase = ({ game, params }) => game.currentPhase === params.phase;

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
  const canPhase = phase({ game, params: { phase: 'main' } });
  const canCost = card && costs({ board, quantity: card.cost });
  const canPlay = !game.mode && canPhase && canCost;

  return canPlay;
};

export const canPlayCardCharacter = ({ card, board, game }) => {
  return (
    canPlayCard({ card, board, game }) &&
    card.type === 'Character' &&
    board.characters.length < 5
  );
};

export const canReplaceCharacter = ({ card, board, game }) => {
  return (
    canPlayCard({ card, board, game }) &&
    card.type === 'Character' &&
    board.characters.length === 5
  );
};

export const canReplaceCharacterForPlay = ({ activeCards, board, game }) => {
  return (
    isCharacter({ card: activeCards.hand }) &&
    activeCards.character &&
    board.characters.length === 5 &&
    game.mode === 'select:character:to:replace'
  );
};

export const canActiveEffect = () => {};

export const donAttached = ({ currentCard, params }) => {
  return currentCard && currentCard.overCards.length >= params.quantity;
};

export const mode = ({ game, params }) => game.mode === params.mode;
