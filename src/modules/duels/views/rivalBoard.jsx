import React from "react";

import "../components/css/board.css";
import LifeContainer from "./lifeArea";
import CharacterArea from "./characterArea";
import LeaderArea from "./leaderArea";
import DonArea from "./donArea";
import HandArea from "./handArea";

function RivalBoard({ className = "" }) {
  return (
    <>
      <section className={"tablero " + className}>
        <HandArea childClassName="rotated"></HandArea>
        <DonArea childClassName="rotated"></DonArea>
        <LeaderArea childClassName="rotated"></LeaderArea>
        <CharacterArea childClassName="rotated"></CharacterArea>
        <LifeContainer childClassName="rotated"></LifeContainer>
      </section>
    </>
  );
}

export default RivalBoard;
