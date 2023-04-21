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

const defaultEffect = {
  effects: {},
};

function getEffect(name) {
  const effectsHash = {
    don: {
      addAttackFromDon: {
        trigger: 'onActive',
        chaing: {
          setMode: {
            name: 'setMode',
            params: ['select:character:leader'],
          },
          lockAllExcept: {
            name: 'lockAllExcept',
            params: ['character', 'leader'],
          },
          activateCharacterSelectorAll: {
            name: 'activateCharacterSelectorAll',
            params: [],
          },
          activateLeaderSelector: {
            name: 'activateLeaderSelector',
            params: [],
          },
          addAttack: {
            ...effects.addAttack(1000),
            others: {
              targets: [TARGET_TYPES.LEADER, TARGET_TYPES.CHARACTER],
            },
          },
          cleanAll: {
            name: 'cleanAll',
            params: [],
          },
        },
      },
    },
  };

  return effectsHash[name];
}

export default Object.seal(getEffect);
