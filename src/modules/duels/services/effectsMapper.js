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
  ACTIVE_HAND: 'hand',
});

function getEffect(name) {
  const effectsHash = {
    characters: {
      play: {
        label: 'Jugar personaje',
        trigger: 'activate',
        conditions: [conditions('canPlayCardCharacter')],
        chaing: [
          effects('restMultipleDonsFromActive', {
            target: TARGET_TYPES.ACTIVE_HAND,
          }),
          effects('initPlayCard'),
          effects('cleanAll'),
        ],
      },
      replace: {
        label: 'Reemplazar personaje',
        trigger: 'activate',
        conditions: [conditions('canReplaceCharacterForPlay')],
        chaing: [
          effects('setMode', { mode: 'select:character:to:replace' }),
          effects('lockAllExcept', { exeptions: ['character'] }),
          effects('activateCharacterSelectorAll'),
          effects('awaitSelection'),
          effects('restMultipleDonsFromActive', {
            target: TARGET_TYPES.ACTIVE_HAND,
          }),
          effects('replaceCharacter'),
          effects('cleanAll'),
        ],
      },
    },

    'Don!!:don': {
      addAttackFromDon: {
        trigger: 'activate',
        chaing: [
          effects('setMode', { mode: 'select:character&&leader' }),
          effects('lockAllExcept', {
            exeptions: ['character', 'leader'],
          }),
          effects('activateLeaderSelector'),
          effects('activateCharacterSelectorAll'),
          effects('awaitSelection'),
          effects('addAttack', {
            targets: [TARGET_TYPES.LEADER, TARGET_TYPES.CHARACTER],
          }),
          effects('setActiveDonUnderCard'),
          effects('cleanAll'),
          effects('emitBoard'),
        ],
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
        chaing: [
          effects('addAttackToAll'),
          effects('registerPlay', {
            type: 'leader_effect',
            effectName: 'RoronoaZoro:OP01-001:EFFECT:1',
          }),
          effects('cleanAll'),
        ],
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
          conditions('hasAvaibleCost', { quantity: 2 }),
          conditions('hasExactCharacters', { quantity: 5 }),
        ],
        chaing: [
          effects('setMode', {
            mode: 'select:character:in:characterZone',
          }),
          effects('lockAllExcept', {
            exeptions: ['character'],
          }),
          effects('activateCharacterSelectorAll'),
          effects('awaitSelection'),
          effects('registerPlay', {
            type: 'leader_effect',
            effectName: 'TrafalgarLaw:OP01-002:EFFECT:1',
          }),
          effects('restMultipleDons', { quantity: 2 }),
          effects('returnCharacterFromFieldToHand'),
          effects('cleanCharacterSelectorAll'),
          effects('cleanHandSelector'),
          effects('cleanActiveCards'),
          effects('lockAllExcept', {
            exeptions: ['hand'],
          }),
          effects('activateHandSelectorFilteredAnd', {
            filterByColor: {
              equal: false,
              from: 'affectedCards', // card / affectedCards
            },
            filterByCost: {
              cost: 5,
              symbol: '<=',
            },
          }),
          effects('setMode', {
            mode: 'select:character:in:hand',
          }),
          effects('awaitSelection'),
          effects('playCardFromHand'),
          effects('cleanAll'),
        ],
      },
    },

    'MonkeyD.Luffy:OP01-003': {
      'MonkeyD.Luffy:OP01-003:EFFECT:1': {
        label: 'Regresar 1 y Jugar 1',
        trigger: 'activate',
        conditions: [
          conditions('oncePerTurn'),
          conditions('currentMode'),
          conditions('phase'),
          conditions('hasAvaibleCost', { quantity: 4 }),
          conditions('hasExactCharacters', { quantity: 5 }),
        ],
        chaing: [
          effects('setMode', {
            mode: 'select:character:in:characterZone',
          }),
          effects('lockAllExcept', {
            exeptions: ['character'],
          }),
          effects('activateCharacterSelectorAll'),
          effects('awaitSelection'),
          effects('registerPlay', {
            type: 'leader_effect',
            effectName: 'MonkeyD.Luffy:OP01-003:EFFECT:1',
          }),
          effects('restMultipleDons', { quantity: 2 }),
          effects('returnCharacterFromFieldToHand'),
          effects('cleanCharacterSelectorAll'),
          effects('cleanHandSelector'),
          effects('cleanActiveCards'),
          effects('lockAllExcept', {
            exeptions: ['hand'],
          }),
          effects('activateHandSelectorFilteredAnd', {
            filterByColor: {
              equal: false,
              from: 'affectedCards', // card / affectedCards
            },
            filterByCost: {
              cost: 5,
              symbol: '<=',
            },
          }),
          effects('setMode', {
            mode: 'select:character:in:hand',
          }),
          effects('awaitSelection'),
          effects('playCardFromHand'),
          effects('cleanAll'),
        ],
      },
    },
  };

  return effectsHash[name] || {};
}

export default Object.seal(getEffect);
