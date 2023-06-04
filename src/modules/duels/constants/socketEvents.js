export default Object.seal({
  GAME_FAKE_STATE_CREATE: 'game:fakeStateCreate',
  GAME_FAKE_STATE_CREATED: 'game:fakeStateCreated',

  GAME_INITIAL_BOARD_STATE: 'game:boardState',
  GAME_DECK_SELECTED: 'game:deckSelected',
  GAME_TURN_SELECTION_INIT: 'game:turnSelectionInit',
  GAME_TURN_SELECTION_END: 'game:turnSelectionEnd',
  GAME_TURN_SELECTION_CHOICE: 'game:turnSelectionChoice',
  GAME_STATE: 'game:gameState',

  // LISTENERS
  GAME_ROOM_JOIN: 'game:room_join',
  GAME_ROCK_SCISSORS_PAPER_RESULT: 'game:rockScissorsPaperResult',
  GAME_ROCK_SCISSORS_PAPER_START: 'game:initRockPaperScissors',
  GAME_ROCK_PAPER_SCISSORS_CHOICE: 'game:rockPaperScissorsChoice',

  // no used
  GAME_TURN_START: 'game:turnStart',
  GAME_ROOM_CANCEL: 'game:cancel',
  GAME_TURN_WAIT: 'game:turnWait',
  GAME_TURN_END: 'game:turnEnd',

  // playin
  GAME_MULLIGAN: 'game:mulligan',
  GAME_PHASES_MULLIGAN: 'game:phasesMulligan',
  GAME_PHASES_REFRESH: 'game:phasesRefresh',
  GAME_PHASES_REFRESH_END: 'game:phasesRefreshEnd',
  GAME_PHASES_DRAW: 'game:phasesDraw',
  GAME_PHASES_DRAW_END: 'game:phasesDrawEnd',
  GAME_PHASES_DON: 'game:phasesDon',
  GAME_PHASES_DON_END: 'game:phasesDonEnd',
  GAME_PHASES_MAIN: 'game:phasesMain',
  GAME_PHASES_MAIN_END: 'game:phasesMainEnd',
  GAME_PHASE_END: 'game:phaseEnd',

  GAME_DON_PLUS: 'game:donPlus',

  // RIVAL EVENTS
  GAME_RIVAL_PHASES_REFRESH: 'game:rivalPhasesRefresh',
  GAME_RIVAL_PHASES_DRAW: 'game:rivalPhasesDraw',
  GAME_RIVAL_MULLIGAN: 'game:rivalMulligan',
  GAME_RIVAL_PHASES_DON: 'game:rivalPhasesDon',
  GAME_RIVAL_PHASES_MAIN: 'game:rivalPhasesMain',
  GAME_RIVAL_PHASES_END: 'game:rivalPhasesEnd',
  GAME_RIVAL_DON_PLUS: 'game:rivalDonPlus',
});
