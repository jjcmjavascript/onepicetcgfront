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
        trigger: 'activate',
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

    'RoronoaZoro:OP01-001': {
      'RoronoaZoro:OP01-001:EFFECT:1': {
        label: '+1000 a todos los personajes',
        trigger: 'auto',
        conditions: [
          conditions('oncePerTurn'),
          conditions('currentMode'),
          conditions('phase'),
          conditions('donAttached'),
        ],
        chaing: {
          addAttackToAll: effects('addAttackToAll'),
          registerPlay: effects('registerPlay', {
            type: 'leader_effect',
            effectName: 'RoronoaZoro:OP01-001:EFFECT:1',
          }),
          cleanAll: effects('cleanAll'),
        },
      },
    },

    'TrafalgarLaw:OP01-002': {
      'TrafalgarLaw:OP01-002:EFFECT:1': {
        label: 'Regresar 1 y Jugar 1',
        trigger: 'activate',
        conditions: [
          conditions('oncePerTurn'),
          conditions('currentMode'),
          conditions('phase'),
          conditions('donAttached', { quantity: 2 }),
          conditions('charactersQuantity', { quantity: 5 }),
        ],
        chaing: {
          addAttackToAll: effects('addAttackToAll'),
          registerPlay: effects('registerPlay', {
            type: 'leader_effect',
            effectName: 'TrafalgarLaw:OP01-002:EFFECT:1',
          }),
          cleanAll: effects('cleanAll'),
        },
      },
    },
  };

  return effectsHash[name];
}

export default Object.seal(getEffect);