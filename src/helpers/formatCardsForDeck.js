import setUuid from './setUuid';
import { DON } from './cardTypes';

function formatCardsForDeck(decks, control = { withDons: true }) {
  if (Array.isArray(decks)) {
    return decks.map((deck) => formatCardsForDeck(deck));
  }
  const don = decks._cards.find((card) => card.type_id === DON);
  const cards = [];

  decks._cards.forEach((card) => {
    const quantity = card.pivot_decks_cards.quantity;
    for (let i = 0; i < quantity; i++) {
      cards.push(card);
    }
  });

  if (control.withDon) {
    for (let i = 0; i < 9; i++) {
      cards.push(don);
    }
  }

  decks._cards = setUuid(cards);

  return decks;
}

export default formatCardsForDeck;
