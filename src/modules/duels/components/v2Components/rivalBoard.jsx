import React from "react";

import LifeContainer from "./lifeArea";
import CharacterArea from "./characterArea";
import LeaderArea from "./leaderArea";
import DonArea from "./donArea";
import HandArea from "./handArea";

function RivalBoard({ className = "" }) {
  return (
    <>
      <section className={"tablero"}>
        <HandArea className="mano rotated"></HandArea>
        <DonArea className="tablero-abajo rotated"></DonArea>
        <LeaderArea className="tablero-arriba-dos rotated"></LeaderArea>
        <CharacterArea className="tablero-arriba rotated"></CharacterArea>
        <LifeContainer className="life rotated"></LifeContainer>
      </section>
    </>
  );
}

export default RivalBoard;
