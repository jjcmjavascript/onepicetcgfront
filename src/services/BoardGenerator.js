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
    this.board.costs = this.board.dons.splice(0, 2);

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
}

export default DeckGenerator;
