import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    cardService.getSelects().then((res) => {
      setFiltersSelects(res.data);
    });
  }, []);

  return [
    filtersSelects,
    setFiltersSelects,
  ]
};

export default useSelects;
