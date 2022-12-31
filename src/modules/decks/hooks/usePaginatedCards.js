import { useState, useEffect } from 'react';
import deckService from '../services/deckService';

const paginateSchema = {
  total: 0,
  pages: 0,
  currentPage: 0,
  nextPage: null,
  rows: [],
};
const usePaginateCard = ({ filters }) => {
  const [paginate, setPaginate] = useState(paginateSchema);
  const [cards, setCards] = useState([]);

    useEffect(() => {
      deckService.getCards(filters).then((res) => {
        setPaginate(res.data);
        setCards(cards.concat(res.data.rows));
      });
    }, [filters]);

  return {
    paginate,
    setPaginate,
    cards,
    setCards
  };
};

export default usePaginateCard;
