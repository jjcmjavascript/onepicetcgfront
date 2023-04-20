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
      effects: {
        trigger: 'onActive',
        addAttackFromDon: {
          chaing: {
            initSumAttackFromDonEvent: {
              name: 'initSumAttackFromDonEvent',
              params: [],
            },
            addAttack: () => {
              return {
                ...effects.addAttack(1000),
                targets: [TARGET_TYPES.LEADER, TARGET_TYPES.CHARACTER],
              };
            },
            endSumAttackFromDonEvent: {
              name: 'endSumAttackFromDonEvent',
              params: [],
            },
          },
        },
      },
    },
  };

  return effectsHash[name] || defaultEffect();
}
