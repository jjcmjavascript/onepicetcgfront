import React, { useContext } from "react";
import store from "../providers/store";
import SimpleCard from "../components/simpleCard";
import Btn from "../../../components/btn";

function RightSide({ className }) {
  const { hooks, actions, states } = useContext(store.cardContext);
  const [activeCard] = states.activeCard;
  const { deck } = hooks.deck;

  return (
    <>
      <div className={className}>
        <Btn
          className="success col-12 mt-1"
          disabled={false}
          onClick={() => {
            actions.persistDeck();
          }}
        >
          Guardar
        </Btn>

        <SimpleCard className="card col-12 mt-1 border-default">
          {activeCard && (
            <img src={activeCard._image_full.route} className="img-fluid"></img>
          )}
        </SimpleCard>

        <SimpleCard className="card col-12 mt-1 border-default">
          {activeCard && activeCard.name} <br />
          {activeCard && activeCard.card_text}
          <br />
        </SimpleCard>
      </div>
    </>
  );
}

export default RightSide;
