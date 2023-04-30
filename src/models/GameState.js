import Plays from './Plays';
class GameState {
  constructor(gameState) {
    this.plays = gameState.plays;
    this.currentTurnPlayerId = gameState.currentTurnPlayerId;
    this.currentPhase = gameState.currentPhase;
    this.turnNumber = gameState.turnNumber;
    this.rockPaperScissorWinner = gameState.rockPaperScissorWinner;
    this.mode = gameState.mode;
    this.pendingEffects = gameState.pendingEffects || [];
    this.continuesEffects = gameState.continuesEffects || [];
  }

  static getDefault() {
    return new GameState({
      currentTurnPlayerId: 0,
      turnNumber: 1,
      rockPaperScissorWinner: null,
      currentPhase: 'main',
      mode: '',
      pendingEffects: [],
      continuesEffects: [],
      plays: Plays.getDefault(),
    });
  }

  get currentPlays() {
    return this.plays.list[this.turnNumber] || [];
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

  mergePlay(play) {
    console.log('mergePlay', play);
    return this.merge({
      plays: this.plays.merge({
        turnNumber: this.turnNumber,
        play: {
          ...play,
          inTheirTurn: this.currentTurnPlayerId === play.playerId,
        },
      }),
    });
  }
}

export default GameState;
