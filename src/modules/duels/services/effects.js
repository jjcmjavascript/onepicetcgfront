class Effects {
  setMode(params) {
    return {
      name: 'setMode',
      params: { mode: '', ...params },
    };
  }

  lockAllExcept(params) {
    return {
      name: 'lockAllExcept',
      params: { ...params },
    };
  }

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
      label: 'Agregar ataque',
      name: 'addAttack',
      params: { amount: 1000, ...params },
    };
  }

  restDon(params) {
    return {
      name: 'restDon',
      params: { quantity: 1, ...params },
    };
  }

  activateLeaderSelector(params) {
    return {
      name: 'activateLeaderSelector',
      params: { ...params },
    };
  }

  activateCharacterSelectorAll(params) {
    return {
      name: 'activateCharacterSelectorAll',
      params: { ...params },
    };
  }

  awaitSelection(params) {
    return {
      name: 'awaitSelection',
      params: { ...params },
    };
  }

  cleanAll(params) {
    return {
      name: 'cleanAll',
      params: { ...params },
    };
  }

  setDonUnderCard(params) {
    return {
      name: 'setDonUnderCard',
      params: { ...params },
    };
  }

  emitBoard(params) {
    return {
      name: 'emitBoard',
      params: { ...params },
    };
  }

  setActiveDonUnderCard(params) {
    return {
      name: 'setActiveDonUnderCard',
      params: { ...params },
    };
  }

  addAttackToAll(params) {
    return {
      name: 'addAttackToAll',
      params: { amount: 1000, ...params },
    };
  }

  registerPlay(params) {
    return {
      name: 'registerPlay',
      params: { ...params },
    };
  }

  returnCharacterFromFieldToHand(params) {
    return {
      name: 'returnCharacterFromFieldToHand',
      params: { registerAffectedCard: true, quantity: 1, ...params },
    };
  }

  cleanCharacterSelectorAll(params) {
    return {
      name: 'cleanCharacterSelectorAll',
      params: { ...params },
    };
  }

  cleanHandSelector(params) {
    return {
      name: 'cleanHandSelector',
      params: { ...params },
    };
  }

  activateHandSelectorFiltered(params) {
    return {
      name: 'activeHandSelectorFiltered',
      params: { ...params },
    };
  }

  cleanActiveCards(params) {
    return {
      name: 'cleanActiveCards',
      params: { ...params },
    };
  }

  playCardFromHand(params) {
    return {
      name: 'playCardFromHand',
      params: { ...params },
    };
  }
}

const effects = Object.seal(new Effects());

export default Object.seal((name, params = {}) => {
  return effects[name](params);
});
