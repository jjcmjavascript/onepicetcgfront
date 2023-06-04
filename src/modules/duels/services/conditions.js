class Conditions {
  generic(params) {
    return {
      ...params,
    };
  }

  currentMode(params) {
    return {
      name: 'mode',
      params: { mode: '', ...params },
    };
  }

  phase(params) {
    return {
      name: 'phase',
      params: { phase: 'main', ...params },
    };
  }

  donAttached(params) {
    return {
      name: 'donAttached',
      params: { quantity: 1, ...params },
    };
  }

  oncePerTurn() {
    return {
      name: 'oncePerTurn',
      params: {},
    };
  }

  hasExactCharacters(params) {
    return {
      name: 'hasExactCharacters',
      params: { quantity: 1, ...params },
    };
  }

  hasAvaibleCost(params) {
    return {
      name: 'hasAvaibleCost',
      params: { quantity: 1, ...params },
    };
  }

  canPlayCard() {
    return {
      name: 'canPlayCard',
      params: {},
    };
  }

  canPlayCardCharacter() {
    return {
      name: 'canPlayCardCharacter',
      params: {},
    };
  }

  canReplaceCharacterForPlay() {
    return {
      name: 'canReplaceCharacterForPlay',
      params: {},
    };
  }

  hasCharactersInHand(params) {
    return {
      name: 'hasCharactersInHand',
      params: {
        min: 1,
        max: Infinity,
        ...params,
      },
    };
  }

  hasCharactersTypesInHand(params) {
    return {
      name: 'hasCharactersTypesInHand',
      params: {
        types: [],
        ...params,
      },
    };
  }
}

const conditions = Object.seal(new Conditions());

export default Object.seal((name, params = {}) => {
  return conditions[name](params);
});
