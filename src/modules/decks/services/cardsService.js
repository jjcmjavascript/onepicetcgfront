import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL + '/cards';

const headers = {
  'Content-Type': 'application/json',
};

const getCards = (filters = {}) => {
  let formatedFilters = '';

  Object.keys(filters).forEach((key) => {
    formatedFilters = formatedFilters.concat(`${key}=${filters[key]}&`);
  });

  const options = { headers };

  return axios.get(`${baseUrl}?${formatedFilters}`, options);
};

export default { getCards };
