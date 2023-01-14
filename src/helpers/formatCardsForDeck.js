import setUuid from './setUuid';

function formatCardsForDeck(decks) {
  if (Array.isArray(decks)) {
    return decks.map((deck) => formatCardsForDeck(deck));
  }

  const cards = [];
  decks._cards.forEach((card) => {
    const quantity = card.pivot_decks_cards.quantity;
    for (let i = 0; i < quantity; i++) {
      cards.push(card);
    }
  });

  decks._cards = setUuid(cards);

  return decks;
}

export default formatCardsForDeck;
