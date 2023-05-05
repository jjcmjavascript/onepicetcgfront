class Play {
  constructor(play) {
    this.effectName = play.effectName;
    this.type = play.type;
    this.card = play.card;
    this.playerId = play.playerId;
    this.inTheirTurn = play.inTheirTurn;
  }

  get isCard() {
    return this.card !== null;
  }
}

export default Play;
