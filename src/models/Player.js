class Player {
  constructor(player) {
    this.id = player.id;
    this.deckId = player.deckId;
    this.rockPaperScissorChoice = player.rockPaperScissorChoice || null;
    this.didMulligan = player.didMulligan || false;
    this.mulliganAvailable = player.mulliganAvailable || true;
    this.locked = player.locked || false;
    this.mode = player.mode || null;

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
  }
}
export default Player;
