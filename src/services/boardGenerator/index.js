import Board from './Board';
import Card from './Card';

class DeckGenerator {
  constructor() {
    this.board = new Board({});
  }

  generateDeck() {
    for (let i = 0; i < 51; i++) {
      this.board.deck.push(Card.generateFakeCard());
    }
  }

  generateDons() {
    for (let i = 0; i < 10; i++) {
      this.board.dons.push(Card.generateFakeCard());
    }
  }

  generateHand() {
    for (let i = 0; i < 5; i++) {
      this.board.hand.push(this.board.deck.pop());
    }
  }

  generateLeader() {
    this.board.leader = this.board.deck.pop();
  }

  generateLives() {
    this.board.lives = this.board.deck.splice(0, 5);
  }

  init() {
    this.generateDeck();
    this.generateDons();
    this.generateHand();
    this.generateLeader();
    this.generateLives();

    return this.board;
  }
}

export default DeckGenerator;
