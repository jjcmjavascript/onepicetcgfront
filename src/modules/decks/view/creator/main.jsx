import React, { useContext, useEffect } from "react";
import SimpleCard from "../../components/simpleCard";
import Container from "../../../../components/container";
import BadgeRounded from "../../../../components/badgeRounded";
import { useParams } from "react-router-dom";
import store from "../../provider/store";
import { DON_ID, LEADER_ID } from "../../../../helpers/deckRules";

export default function MainCreatorSection({ className }) {
  const { hooks } = useContext(store.CardContext);
  const { deck, removeFromDeck, setDeckFromBackend } = hooks.deck;
  const { getDeckById } = hooks.decks;
  const { id } = useParams();
  const leader = deck.cards.find((item) => item.type_id === LEADER_ID);

  // Si tiene id, entonces se llama a la api para obtener el deck
  id && getDeckById(id, setDeckFromBackend);

  return (
    <>
      <div className={className}>
        <Container>
          <div className="col-12">
            <BadgeRounded color="success">
              Leader: {leader ? leader.name : 0}
            </BadgeRounded>
            <BadgeRounded color="warning mx-2">
              Don: {deck.cards.filter((item) => item.type_id === DON_ID).length}
            </BadgeRounded>
            <BadgeRounded color="info mx-1">
              Total : {deck.cards.length}
            </BadgeRounded>
            <BadgeRounded color="primary">Nombre: {deck.name}</BadgeRounded>
          </div>
        </Container>
        <div className="row">
          {deck.cards.map((card, cardKey) => {
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
}
