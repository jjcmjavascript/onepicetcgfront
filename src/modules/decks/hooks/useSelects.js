import React, { useState, useEffect } from 'react';
import deckService from '../services/deckService';

const useSelects = () => {
  const [filtersSelects, setFiltersSelects] = useState({
    costs: [],
    attacks: [],
    types: [],
    packs: [],
    colors: [],
    categories: [],
  });

  useEffect(() => {
    deckService.getSelects().then((res) => {
      setFiltersSelects(res.data);
    });
  }, []);

  return [
    filtersSelects,
    setFiltersSelects,
  ]
};

export default useSelects;
