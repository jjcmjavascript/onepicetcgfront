class GameState {
  constructor(gameState) {
    this.currentTurnPlayerId = gameState.currentTurnPlayerId;
    this.currentPhase = gameState.currentPhase;
    this.turnNumber = gameState.turnNumber;
    this.rockPaperScissorWinner = gameState.rockPaperScissorWinner;
    this.selectionMode = gameState.selectionMode;
  }

  static getDefault() {
    return new GameState({
      currentTurnPlayerId: 0,
      currentPhase: '',
      turnNumber: 1,
      rockPaperScissorWinner: null,
    });
  }
}

export default GameState;
