class Conditions {
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

  oncePerTurn(params) {
    return {
      name: 'oncePerTurn',
      params: { ...params },
    };
  }

  charactersQuantity(params) {
    return {
      name: 'characters',
      params: { quantity: 1, ...params },
    };
  }
}

const conditions = Object.seal(new Conditions());

export default Object.seal((name, params = {}) => {
  return conditions[name](params);
});
