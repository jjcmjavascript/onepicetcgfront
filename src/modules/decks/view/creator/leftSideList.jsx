import React, { useContext, useEffect, useRef } from "react";
import store from "../../provider/store";
import FiltersSection from "../../components/filtersSection";
import ListContainer from "../../components/listContainer";
import SimpleCard from "../../components/simpleCard";

export default function LeftSide({ className }) {
  const { hooks, states } = useContext(store.CardContext);
  const { cards, paginate, getPaginateCards } = hooks.paginate;
  const { setInDeck } = hooks.deck;
  const [_, setActiveCard] = states.activeCard;
  const [filters, setFilters] = states.filters;

  const getMorePagesOnScroll = (event) => {
    var scrollY = event.target.scrollHeight - event.target.scrollTop;
    var height = event.target.offsetHeight;
    var offset = height - scrollY;

    if (offset == 0 || offset == 1) {
      if (filters.page + 1 <= paginate.nextPage) {
        setFilters({ ...filters, page: filters.page + 1 });
      }
    }
  };

  getPaginateCards(filters);

  return (
    <div className={className}>
      <FiltersSection />

      <ListContainer
        className="col-12 mt-1 text-center px-2"
        id="list_container_id"
        onScroll={getMorePagesOnScroll}
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
}
