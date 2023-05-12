import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const swalMessage = (title, html, icon) => {
  Swal.fire({
    title,
    html,
    icon,
  });
};
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
    swalMessage('Error', 'Error al obtener decks', 'error');
  }
};

const saveDeck = async (deck) => {
  try {
    const options = { headers };
    const response = await axios.post(baseUrl, deck, options);
    return response.data.deck;
  } catch (err) {
    swalMessage('Error', 'Error al Almacenar el deck', 'error');
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
    swalMessage('Error', 'Error al Buscar deck', 'error');
  }
};

const updateDeck = async (deck) => {
  try {
    const options = { headers };
    const response = await axios.put(
      `${baseUrl}/${deck.id}/edit`,
      deck,
      options
    );
    return response.data.deck;
  } catch (err) {
    swalMessage('Error', 'Error al actualizar el deck', 'error');
  }
};

export default { getDecks, saveDeck, deleteDeck, findDeck, updateDeck };
