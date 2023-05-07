import { useState, useEffect } from 'react';
import cardService from '../services/cardService';

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

  const getPaginateCards = () => {
    return cardService.getCards(filters).then((res) => {
      setPaginate(res.data);
      setCards(cards.concat(res.data.rows));
    });
  };

  return {
    paginate,
    setPaginate,
    cards,
    setCards,
    getPaginateCards,
  };
};

export default usePaginateCard;
