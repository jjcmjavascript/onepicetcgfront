import Player from '../models/Player';
import Card from '../models/Card';

class DeckGenerator {
  constructor() {
    this.board = new Player({});
  }

  generateDeck() {
    for (let i = 0; i < 51; i++) {
      this.board.deck.push(Card.generateFakeCard());
    }

    return this;
  }

  generateDons() {
    for (let i = 0; i < 10; i++) {
      this.board.dons.push(Card.generateFakeCard());
    }

    return this;
  }

  generateHand(quantity = 5) {
    for (let i = 0; i < quantity; i++) {
      this.board.hand.push(this.board.deck.pop());
    }

    return this;
  }

  generateLeader() {
    this.board.leader = this.board.deck.pop();

    return this;
  }

  generateLives() {
    this.board.lives = this.board.deck.splice(0, 5);

    return this;
  }

  generateCharacter(quantity = 1) {
    this.board.characters = this.board.deck.splice(0, quantity);

    return this;
  }

  generateCosts() {
    this.board.costs = this.board.dons.splice(0, 9);

    return this;
  }

  generateBoard() {
    this.generateDeck()
      .generateDons()
      .generateHand()
      .generateLeader()
      .generateLives()
      .generateCharacter()
      .generateCosts();

    return this.board;
  }

  generateDeckStructure() {
    const deck = Card.generateFakeDeck({
      character: 36,
      leader: 1,
      stage: 4,
      event: 10,
      dons: 10,
    });

    const characters = deck.filter((card) => card.type === 'Character');
    const leaders = deck.filter((card) => card.type === 'Leader');
    const stages = deck.filter((card) => card.type === 'Stage');
    const events = deck.filter((card) => card.type === 'Event');
    const dons = deck.filter((card) => card.type === 'Don');

    this.board.leader = leaders[0];
    this.board.don = dons[0];
    this.board.dons = dons;
    this.board.costs = dons.splice(0, 7);
    this.board.characters = characters.splice(0, 1);
    this.board.deck = [...characters, ...stages, ...events]
    this.board.lives = this.board.deck.splice(0, this.board.leader.lives);
    this.board.hand = this.board.deck.splice(0, 5);

    return this.board;
  }
}

export default DeckGenerator;
