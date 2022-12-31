import React, { useContext, useEffect, useRef } from "react";
import store from "../providers/store";
import InputSeach from "../components/inputSeach";
import ListContainer from "../components/listContainer";
import SimpleCard from "../components/simpleCard";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const leftSide = ({ className }) => {
  const { paginateState, deckState, activeCardState, filterState } = useContext(
    store.cardContext
  );
  const { cards, paginate } = paginateState;
  const { setInDeck } = deckState;
  const [_, setActiveCard] = activeCardState;
  const [filters, setFilters] = filterState;

  const onScrollHandler = (event) => {
    var scrollY = event.target.scrollHeight - event.target.scrollTop;
    var height = event.target.offsetHeight;
    var offset = height - scrollY;

    if (offset == 0 || offset == 1) {
      if(filters.page + 1 <= paginate.nextPage){
        setFilters({ ...filters, page: filters.page + 1 });
      }
    }
  };

  return (
    <div className={className}>
      <InputSeach />
      <div className="row mt-2 ">
        <div className="col-6">
          <select className="form-select">
            <option defaultValue=""> Elija un Color</option>
            <option value="1">Rojo</option>
            <option value="2">Azul</option>
            <option value="3">Verde</option>
          </select>
        </div>

        <div className="col-6">
          <select className="form-select">
            <option defaultValue="">Elija un Tipo</option>
            <option value="1">Rojo</option>
            <option value="2">Azul</option>
            <option value="3">Verde</option>
          </select>
        </div>
      </div>

      <ListContainer
        className="col-12 mt-1 text-center px-2"
        id="list_container_id"
        onScroll={onScrollHandler}
      >
        {cards.length > 0 &&
          cards.map((card) => {
            return (
              <SimpleCard
                key={card.id}
                id={card.id}
                className="card col-12 mt-1 border-default"
                onClick={() => setInDeck(card)}
                onMouseEnter={() => setActiveCard(card)}
              >
                🥋{card.name} | 💸{card.cost}
              </SimpleCard>
            );
          })}
      </ListContainer>
    </div>
  );
};

export default leftSide;
