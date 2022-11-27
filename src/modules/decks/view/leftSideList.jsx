import React, { useContext } from "react";
import store from "../providers/store";
import InputSeach from "../components/inputSeach";
import ListContainer from "../components/listContainer";
import SimpleCard from "../components/simpleCard";

const leftSide = ({ className }) => {
  const { usePaginate, useDeck, useActiveCard } = useContext(store.cardContext);
  const { cards } = usePaginate;
  const { setInDeck } = useDeck;
  const [setActiveCard] = useActiveCard;

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

      <ListContainer className="col-12 mt-1 text-center px-2 ">
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
