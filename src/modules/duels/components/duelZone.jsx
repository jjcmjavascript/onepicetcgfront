import React, { useContext, useEffect, useState } from "react";

import Store from "../provider/duelProvider";
import CharactedArea from "./characterArea";
import LifeArea from "./lifeArea";
import CostsArea from "./costsArea";
import LeaderArea from "./leaderArea";
import TrashArea from "./trashArea";
import DonArea from "./donArea";
import deckService from "../../decks/services/deckService";
import Hand from "./hand";


function DuelZone({ children }) {
  const { state, hooks } = useContext(Store.DuelContext);
  const [deck, setDeck] = useState({
    deck: [],
    id: "",
    name: "",
  });

  const [hand, setHand] = useState([]);

  useEffect(() => {
    deckService.getDecks().then((res) => {
      const deckCards = res.data[0]._cards;

      setDeck({
        deck: deckCards,
        id: res.data[0].id,
        name: res.data[0].name,
      });

      setHand(deckCards.slice(0,5));
    });
  }, []);

  return (
    <>
      <div className="duel--area rotated">
        <div className="duel--area__left">
          <LifeArea />
          <DonArea />
        </div>
        <div className="duel--area_right">
          <CharactedArea />
          <LeaderArea />
          <div className="botton-area">
            <CostsArea />
            <TrashArea />
          </div>
        </div>
      </div>

      <div className="duel--area">
        <div className="duel--area__left">
          <LifeArea />
          <DonArea />

        </div>
        <div className="duel--area_right">
          <CharactedArea />
          <LeaderArea />
          <div className="botton-area">
            <CostsArea />
            <TrashArea />
          </div>
        </div>
      </div>

      <Hand hand={hand}/>
    </>
  );
}

export default DuelZone;
