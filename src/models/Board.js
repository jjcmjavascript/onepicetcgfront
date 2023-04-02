class Board {
  constructor(board) {
    this.leader = board.leader || null;
    this.don = board.don || null;
    this.stage = board.stage || null;
    this.characters = board.characters || [];
    this.costs = board.costs || [];
    this.trash = board.trash || [];
    this.dons = board.dons || [];
    this.lives = board.lives || [];
    this.deck = board.deck || [];
    this.hand = board.hand || [];
  }
}

export default Board;
