import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + 'deck';

const headers = {
  'Content-Type': 'application/json',
};

const getDecks = async () => {
  try {
    const options = { headers };
    const response = await axios.get(`${baseUrl}`, options);
    const decks = response.data;
    return decks;
  } catch (err) {
    throw err;
  }
};

export default { getDecks };
