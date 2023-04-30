class Play {
  constructor(play) {
    this.name = play.name || null;
    this.type = play.type || null;

    this.card = play.card || null;
    this.playerId = play.playerId || null;
    this.inTheirTurn = play.inThemTurn || false;
  }

  get isCard() {
    return this.card !== null;
  }
}

export default Play;
