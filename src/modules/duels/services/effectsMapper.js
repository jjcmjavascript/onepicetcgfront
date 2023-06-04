import effects from './effects';
import conditions from './conditions';
import targetTypes from '@duels/constants/targetTypes';

const categories = Object.seal({
  SUPER_NOVA: 'Super Nova',
  STRAW_HAT: 'Straw Hat Crew',
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
            target: targetTypes.ACTIVE_HAND,
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
            target: targetTypes.ACTIVE_HAND,
          }),
          effects('replaceCharacter'),
          effects('cleanAll'),
        ],
      },
    },

    'don!!:don': {
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
            targets: [targetTypes.LEADER, targetTypes.CHARACTER],
          }),
          effects('setActiveDonUnderCard'),
          effects('cleanAll'),
          effects('emitBoard'),
        ],
      },
    },

    'roronoazoro:OP01-001': {
      'roronoazoro:OP01-001:EFFECT:1': {
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
            effectName: 'roronoazoro:OP01-001:EFFECT:1',
            effectScope: 'always',
          }),
          effects('cleanAll'),
        ],
      },
    },

    'trafalgarlaw:OP01-002': {
      'trafalgarlaw:OP01-002:EFFECT:1': {
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
            effectName: 'trafalgarlaw:OP01-002:EFFECT:1',
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

    'monkeyd.luffy:OP01-003': {
      'monkeyd.luffy:OP01-003:EFFECT:1': {
        label: 'Cambia a activa un personaje',
        trigger: 'activate',
        conditions: [
          conditions('oncePerTurn'),
          conditions('currentMode'),
          conditions('phase'),
          conditions('hasAvaibleCost', { quantity: 4 }),
          conditions('hasRestedCharactersByCategoriesAndCosts', {
            filterByCategories: {
              categories: [categories.SUPER_NOVA, categories.STRAW_HAT],
            },
            filterByCost: {
              cost: 5,
              symbol: '<=',
            },
          }),
        ],
        chaing: [
          effects('setMode', {
            mode: 'select:character:in:characterZone',
          }),
          effects('lockAllExcept', {
            exeptions: ['character'],
          }),
          effects('registerPlay', {
            type: 'leader_effect',
            effectName: 'monkeyd.luffy:OP01-003:EFFECT:1',
          }),
          effects('activateCharacterSelectorAll'),
          effects('awaitSelection'),

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
              from: 'affectedCards',
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

export default getEffect;
