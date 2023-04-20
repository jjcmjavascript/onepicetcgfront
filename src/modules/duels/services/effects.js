const addAttactToAllCharacters = (quantity) => {
  return {
    name: 'addAttactToAllCharacters',
    params: [quantity],
  };
};

const restMultipleDons = (quantity) => {
  return {
    name: 'restedMultipleDons',
    params: [quantity],
  };
};

const addAttack = (quantity) => {
  return {
    name: 'addAttackToLeader',
    params: [quantity],
  };
};

const restDon = () => {
  return {
    name: 'restDon',
    params: [],
  };
};

export default Object.seal({
  addAttactToAllCharacters,
  restMultipleDons,
  restDon,
  addAttack,
});
