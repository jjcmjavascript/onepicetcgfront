import Player from '../../../models/Player';
import Card from '../../../models/Card';

class BoardGenerator {
  constructor() {
    this.board = new Player({
      id: Math.ceil(Math.random() * 20),
    });
  }

  generateFakeDeck({ character, leader, stage, event, dons }) {
    let deck = [];

    for (let i = 0; i < character; i++) {
      let card = Card.generateFakeCard();
      card.type = 'Character';
      deck.push(card);
    }

    for (let i = 0; i < leader; i++) {
      let card = Card.generateFakeCard();
      card.type = 'Leader';
      card.code = 'OP01-001';
      card.name = 'RoronoaZoro';
      deck.push(card);
    }

    for (let i = 0; i < stage; i++) {
      let card = Card.generateFakeCard();
      card.type = 'Stage';
      deck.push(card);
    }

    for (let i = 0; i < event; i++) {
      let card = Card.generateFakeCard();
      card.type = 'Event';
      deck.push(card);
    }

    for (let i = 0; i < dons; i++) {
      let card = Card.generateFakeCard();
      card.name = 'DON!!';
      card.type = 'Don';
      card.code = 'don';
      deck.push(card);

      console.log(card.codeName);
    }

    return deck;
  }

  generateDeckStructure() {
    const deck = this.generateFakeDeck({
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
    this.board.characters = characters.splice(0, 5);
    this.board.deck = [...characters, ...stages, ...events];
    this.board.lives = this.board.deck.splice(0, this.board.leader.lives);
    this.board.hand = this.board.deck.splice(0, 5);
    this.board.trash = [];

    return this.board;
  }
}

export default BoardGenerator;
