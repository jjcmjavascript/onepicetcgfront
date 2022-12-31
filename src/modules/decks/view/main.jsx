import React, { useContext } from "react";
import SimpleCard from "../components/simpleCard";
import store from "../providers/store";

export default ({ className }) => {
  const { hooks } = useContext(store.cardContext);
  const { deck, removeFromDeck } = hooks.deck;

  return (
    <>
      <div className={className}>
        <div className="row">
          {deck.map((card, cardKey) => {
            return (
              <div className="col-1 p-1" key={cardKey}>
                <SimpleCard onClick={() => removeFromDeck(cardKey)}>
                  <img src={card._image.route} className="img-fluid" />
                </SimpleCard>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
