import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BACKEND_URL + 'deck';

const headers = {
  'Content-Type': 'application/json',
};

const getDecks = async () => {
  const options = { headers };
  const response = await axios.get(`${baseUrl}`, options);
  const decks = response.data;

  return decks;
};

export default { getDecks };
