import Card from './Card';

const lockeds = {
  character: false,
  cost: false,
  trash: false,
  don: false,
  live: false,
  deck: false,
  leader: false,
  hand: false,
};

class Player {
  constructor(player) {
    this.id = player.id;
    this.deckId = player.deckId;
    this.rockPaperScissorChoice = player.rockPaperScissorChoice;
    this.didMulligan = player.didMulligan;
    this.mulliganAvailable = player.mulliganAvailable;
    this.locked = player.locked;
    this.mode = player.mode; //pendiente de refactor
    this.leader = player.leader;
    this.don = player.don;
    this.stage = player.stage;
    this.characters = player.characters;
    this.costs = player.costs;
    this.trash = player.trash;
    this.dons = player.dons;
    this.lives = player.lives;
    this.deck = player.deck;
    this.hand = player.hand;
    // define los elementos que estan bloqueados en el objeto activeCard - posible refactor
    this.lockeds = player.lockeds || lockeds;
  }

  static getDefault() {
    return new Player({
      id: null,
      deckId: null,
      rockPaperScissorChoice: null,
      didMulligan: false,
      mulliganAvailable: true,
      locked: false,
      mode: null,
      leader: null,
      don: null,
      stage: null,
      characters: [],
      costs: [],
      trash: [],
      dons: [],
      lives: [],
      deck: [],
      hand: [],
      lockeds: { ...lockeds },
    });
  }

  getDefault() {
    return Player.getDefault();
  }

  mapObjectToClasses(object) {
    const keysWithObjectValue = ['leader', 'don', 'stage'];
    const keysWithArrayValue = [
      'lives',
      'characters',
      'costs',
      'dons',
      'deck',
      'hand',
      'trash',
    ];

    return Object.entries(object).reduce((acc, [key, value]) => {
      acc[key] = value;

      if (keysWithArrayValue.includes(key)) {
        acc[key] = value.map((card) => {
          return new Card(card);
        });
      } else if (keysWithObjectValue.includes(key) && value) {
        acc[key] = new Card(value);
      }

      return acc;
    }, {});
  }

  set(player) {
    return new Player({
      ...Player.getDefault(),
      ...this.mapObjectToClasses(player),
    });
  }

  merge(player) {
    return new Player({
      ...this,
      ...this.mapObjectToClasses(player),
    });
  }

  lockAllExcept(exceptions = []) {
    let newLockeds = { ...lockeds };

    Object.keys(newLockeds).forEach((key) => {
      if (exceptions.includes(key)) {
        newLockeds[key] = false;
      } else {
        newLockeds[key] = true;
      }
    });

    return this.merge({
      lockeds: newLockeds,
    });
  }

  unlockAll() {
    return this.merge({
      lockeds: {
        character: false,
        cost: false,
        trash: false,
        don: false,
        live: false,
        deck: false,
        hand: false,
        leader: false,
      },
    });
  }
}
export default Player;
