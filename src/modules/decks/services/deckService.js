import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BACKEND_URL + 'deck';

const headers = {
  'Content-Type': 'application/json',
};

const getDecks = async (filters = {}) => {
  let formatedFilters = '';

  Object.keys(filters).forEach((key) => {
    formatedFilters = formatedFilters.concat(`${key}=${filters[key]}&`);
  });

  try {
    const options = { headers };
    const response = await axios.get(`${baseUrl}?${formatedFilters}`, options);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const saveDeck = async (deck) => {
  try {
    const options = { headers };
    const response = await axios.post(baseUrl, deck, options);
    return response.data.deck;
  } catch (err) {
    throw err;
  }
};

const deleteDeck = (deckId) => {
  const options = { headers };

  return axios.delete(`${baseUrl}/${deckId}`, options);
};

const findDeck = async (deckId) => {
  try {
    const options = { headers };
    const response = await axios.get(`${baseUrl}/${deckId}/edit`, options);
    const deck = response.data;
    return deck;
  } catch (err) {
    throw err;
  }
};

const updateDeck = async (deck) => {
  try {
    const options = { headers };
    const response = await axios.put(`${baseUrl}/${deck.id}/edit`, deck, options);
    return response.data.deck;
  } catch (err) {
    throw err;
  }
};

export default { getDecks, saveDeck, deleteDeck, findDeck, updateDeck };
