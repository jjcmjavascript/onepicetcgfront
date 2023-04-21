const addAttactToAllCharacters = (amount) => {
  return {
    name: 'addAttactToAllCharacters',
    params: { amount },
  };
};

const restMultipleDons = (quantity) => {
  return {
    name: 'restedMultipleDons',
    params: { quantity },
  };
};

const addAttack = (amount) => {
  return {
    name: 'addAttack',
    params: { amount },
  };
};

const restDon = () => {
  return {
    name: 'restDon',
    params: {},
  };
};

export default Object.seal({
  addAttactToAllCharacters,
  restMultipleDons,
  restDon,
  addAttack,
});
