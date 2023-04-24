import effects from './effects';
import conditions from './conditions';

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
          setActiveDonUnderCard: effects('setActiveDonUnderCard'),
          cleanAll: effects('cleanAll'),
          emitBoard: effects('emitBoard'),
        },
      },
    },

    zoro: {
      zoroEffect: {
        label: '+1000 a todos los personajes',
        trigger: 'onActive',
        conditions: [
          conditions('mode'),
          conditions('phase'),
          conditions('donAttached'),
        ],
        chaing: {
          addAttackToAll: effects('addAttackToAll'),
          cleanAll: effects('cleanAll'),
        },
      },
    },
  };

  return effectsHash[name];
}

export default Object.seal(getEffect);
