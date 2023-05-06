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
    this.rockPaperScissorChoice = player.rockPaperScissorChoice || null;
    this.didMulligan = player.didMulligan || false;
    this.mulliganAvailable = player.mulliganAvailable || true;
    this.locked = player.locked || false;
    this.mode = player.mode || null; //pendiente de refactor

    this.leader = player.leader || null;
    this.don = player.don || null;
    this.stage = player.stage || null;
    this.characters = player.characters || [];
    this.costs = player.costs || [];
    this.trash = player.trash || [];
    this.dons = player.dons || [];
    this.lives = player.lives || [];
    this.deck = player.deck || [];
    this.hand = player.hand || [];

    // define los elementos que estan bloqueados en el objeto activeCard - posible refactor
    this.lockeds = player.lockeds || lockeds;
  }

  static getDefault() {
    return new Player({});
  }

  getDefault() {
    return Player.getDefault();
  }

  set(player) {
    return new Player({
      ...Player.getDefault(),
      ...player,
    });
  }

  merge(player) {
    return new Player({
      ...this,
      ...player,
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
