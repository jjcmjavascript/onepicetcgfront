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

  mapObjectToClasses(gameState) {
    return Object.entries(gameState).reduce((acc, [key, value]) => {
      acc[key] = value;

      if (key === 'plays') {
        acc[key] = Plays.getInstancefromObject(value);
      }

      return acc;
    }, {});
  }

  set(gameState) {
    return new GameState({
      ...GameState.getDefault(),
      ...this.mapObjectToClasses(gameState),
    });
  }

  merge(gameState) {
    return new GameState({
      ...this,
      ...this.mapObjectToClasses(gameState),
    });
  }

  mergePlay(play) {
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
