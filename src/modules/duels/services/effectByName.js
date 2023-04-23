import effects from './effects';

const TARGET_TYPES = Object.seal({
  SELF: 'self',
  ALL: 'all',
  LEADER: 'leader',
  STAGE: 'stage',
  CHARACTER: 'character',
  EVENT: 'event',
  DON: 'don',
  OPPONENT: 'opponent',
  OPPONENT_LEADER: 'opponentLeader',
  OPPONENT_STAGE: 'opponentStage',
  OPPONENT_CHARACTER: 'opponentCharacter',
  OPPONENT_EVENT: 'opponentEvent',
  OPPONENT_DON: 'opponentDon',
});

function getEffect(name) {
  const effectsHash = {
    don: {
      addAttackFromDon: {
        trigger: 'onActive',
        chaing: {
          setMode: effects('setMode', { mode: 'select:character:leader' }),
          lockAllExcept: effects('lockAllExcept', {
            exeptions: ['character', 'leader'],
          }),
          activateLeaderSelector: effects('activateLeaderSelector'),
          activateCharacterSelectorAll: effects('activateCharacterSelectorAll'),
          awaitSelection: effects('awaitSelection'),
          addAttack: effects('addAttack', {
            targets: [TARGET_TYPES.LEADER, TARGET_TYPES.CHARACTER],
          }),
          setDonUnderCard: effects('setDonUnderCard'),
          cleanAll: effects('cleanAll'),
        },
      },
    },
  };

  return effectsHash[name];
}

export default Object.seal(getEffect);
