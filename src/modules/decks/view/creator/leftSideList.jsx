import { useContext } from "react";
import store from "../../provider/deckProvider";
import FiltersSection from "../../components/filtersSection";
import ListContainer from "../../components/listContainer";
import SimpleCard from "../../components/simpleCard";
import { useEffect } from "react";

export default function LeftSide({ className }) {
  const { hooks, states } = useContext(store.CardContext);
  const { cards, paginate, getPaginateCards } = hooks.paginate;
  const { setInDeck } = hooks.deck;
  const [, setActiveCard] = states.activeCard;
  const [filters, setFilters] = states.filters;

  const getMorePagesOnScroll = (event) => {
    let scrollY = event.target.scrollHeight - event.target.scrollTop;
    let height = event.target.offsetHeight;
    let offset = height - scrollY;

    if (offset === 0 || offset === 1) {
      if (filters.page + 1 <= paginate.nextPage) {
        setFilters({ ...filters, page: filters.page + 1 });
      }
    }
  };

  useEffect(() => {
    getPaginateCards(filters);
  }, [filters]);

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
