import { useState } from 'react';
import cardService from '../services/cardService';

const useSelects = () => {
  const [filtersSelects, setFiltersSelects] = useState({
    costs: [],
    attacks: [],
    types: [],
    packs: [],
    colors: [],
    categories: [],
  });

  const getSelects = () => {
    return cardService.getSelects().then((res) => {
      setFiltersSelects(res.data);
    });
  };

  return { filtersSelects, setFiltersSelects, getSelects };
};

export default useSelects;
