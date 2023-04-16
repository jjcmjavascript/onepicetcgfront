class GameState {
  constructor(gameState) {
    this.plays = gameState.plays;
    this.currentTurnPlayerId = gameState.currentTurnPlayerId;
    this.currentPhase = gameState.currentPhase;
    this.turnNumber = gameState.turnNumber;
    this.rockPaperScissorWinner = gameState.rockPaperScissorWinner;
    this.mode = gameState.mode;
  }

  static getDefault() {
    return new GameState({
      currentTurnPlayerId: 0,
      turnNumber: 1,
      rockPaperScissorWinner: null,
      currentPhase: 'main',
      mode: '',
      plays: {
        1: [],
      },
    });
  }

  getDefault() {
    return GameState.getDefault();
  }

  get currentPlays() {
    return this.plays[this.turnNumber] || [];
  }

  set(gameState) {
    return new GameState({
      ...GameState.getDefault(),
      ...gameState,
    });
  }

  merge(gameState) {
    return new GameState({
      ...this,
      ...gameState,
    });
  }
}

export default GameState;
