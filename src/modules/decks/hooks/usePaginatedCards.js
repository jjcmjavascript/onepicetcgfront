import { useState, useEffect } from "react";
import cardsService from "../services/cardsService";

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
    cardsService.getCards(filters).then((res) => {
      setPaginate(res);
      setCards(cards.concat(res.data.rows));
    });
  }, [filters]);

  return {
    paginate,
    cards,
  };
};

export default usePaginateCard;
