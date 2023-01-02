import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + 'deck';

const headers = {
  'Content-Type': 'application/json',
};

const getDecks = (filters = {}) => {
  let formatedFilters = '';

  Object.keys(filters).forEach((key) => {
    formatedFilters = formatedFilters.concat(`${key}=${filters[key]}&`);
  });

  const options = { headers };

  return axios.get(`${baseUrl}?${formatedFilters}`, options);
};

const saveDeck = (deck) => {
  const options = { headers };

  return axios.post(baseUrl, deck, options);
};

export default { getDecks, saveDeck };
