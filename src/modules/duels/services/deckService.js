import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + 'deck';

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
    const decks = response.data;
    return decks;
  } catch (err) {
    throw err;
  }
};

export default { getDecks };
