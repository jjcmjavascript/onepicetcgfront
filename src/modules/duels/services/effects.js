class Effects {
  addAttackToAllCharacters(params) {
    return {
      name: 'addAttactToAllCharacters',
      params: { amount: 1000, ...params },
    };
  }

  restMultipleDons(params) {
    return {
      name: 'restedMultipleDons',
      params: { quantity: 1, ...params },
    };
  }

  addAttack(params) {
    return {
      name: 'addAttack',
      params: { amount: 1000, ...params },
    };
  }

  restDon(params) {
    return {
      name: 'restDon',
      params: { quantity: 1 },
    };
  }
}

const effects = Object.seal(new Effects());

export default Object.seal((name, params = {}) => {
  return effects[name](params);
});
