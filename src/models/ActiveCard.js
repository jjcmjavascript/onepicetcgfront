class ActiveCard {
  constructor(object) {
    this.don = object.don;
    this.character = object.character;
    this.hand = object.hand;
    this.trash = object.trash;
    this.zone = object.zone;
    this.leader = object.leader;
    this.live = object.live;
    this.lastActiveName = null;
  }

  static getDefault() {
    return new ActiveCard({
      don: null,
      character: null,
      hand: null,
      trash: null,
      zone: null,
      leader: null,
      live: null,
    });
  }

  //El lastActiveName es colcado apartir del primer elemento encontrado al hacer merge
  get lastActive() {
    return this[this.lastActiveName];
  }

  getDefault() {
    return ActiveCard.getDefault();
  }

  set(activeCard) {
    return new ActiveCard({
      ...ActiveCard.getDefault(),
      ...activeCard,
    });
  }

  merge(activeCard) {
    const lastActiveName = Object.keys(activeCard).find(
      (name) => activeCard[name] !== null
    );

    return new ActiveCard({
      ...this,
      ...activeCard,
      lastActiveName,
    });
  }

  setDonAndLeader(activeCard) {
    return this.set({
      don: this.don,
      leader: activeCard,
    });
  }

  setByMode(mode, activeCard) {
    if (mode === 'select:character:leader') {
      return this.setDonAndLeader(activeCard);
    }
  }
}

export default ActiveCard;
