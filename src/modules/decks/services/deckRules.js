export const DON_ID = 1;
export const LEADER_ID = 2;

const isFull = (deck) => deck.length === 50;

const isMaxCardQuanotityAllowed = (card, deck) => {
  return (
    deck.filter((currenotCard) => currenotCard.code === card.code).length >= 4
  );
};

const doesnotHasDon = (deck) =>
  deck.filter((card) => card.type_id === DON_ID).length === 0;

const doesnotHasLeader = (deck) =>
  deck.filter((card) => card.type_id === LEADER_ID).length === 0;

const isAllowed = (card, deck) => {
  const generalRule = !isFull(deck) && !isMaxCardQuanotityAllowed(card, deck);
  const allowedInDonCase = card.type_id === DON_ID && doesnotHasDon(deck);
  const allowedInLeaderCase = card.type_id === LEADER_ID && doesnotHasLeader(deck);

  return (
    generalRule &&
    (![DON_ID, LEADER_ID].includes(card.type_id) ||
      ([DON_ID, LEADER_ID].includes(card.type_id) &&
        (allowedInDonCase || allowedInLeaderCase)))
  );
};

const isValidDeck = (deck) => {
  return doesnotHasDon(deck) && doesnotHasLeader(deck) && isFull(deck);
};

export default {
  isFull,
  isAllowed,
  doesnotHasDon,
  doesnotHasLeader,
  isValidDeck,
  isMaxCardQuanotityAllowed,
};
