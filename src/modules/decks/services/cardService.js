import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BACKEND_URL + 'deck';

const headers = {
  'Content-Type': 'application/json',
};

const getCards = (filters = {}) => {
  let formatedFilters = '';

  Object.keys(filters).forEach((key) => {
    formatedFilters = formatedFilters.concat(`${key}=${filters[key]}&`);
  });

  const options = { headers };

  return axios.get(`${baseUrl}/create?${formatedFilters}`, options);
};

const getSelects = () => {
  const options = { headers };

  return  axios.get(`${baseUrl}/create/filters`, options);
}

export default { getCards, getSelects };
