class ActiveCard {
  constructor(object) {
    this.don = object.don;
    this.character = object.character;
    this.hand = object.hand;
    this.trash = object.trash;
    this.zone = object.zone;
    this.leader = object.leader;
  }

  static getDefault() {
    return new ActiveCard({
      don: null,
      character: null,
      hand: null,
      trash: null,
      zone: null,
      leader: null,
    });
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
    return new ActiveCard({
      ...this,
      ...activeCard,
    });
  }
}

export default ActiveCard;
