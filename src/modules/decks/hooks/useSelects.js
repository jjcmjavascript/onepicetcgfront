import { useState, useEffect } from 'react';
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
    useEffect(() => {
      cardService.getSelects().then((res) => {
        setFiltersSelects(res.data);
      });
    }, []);
  };

  return { filtersSelects, setFiltersSelects, getSelects };
};

export default useSelects;
