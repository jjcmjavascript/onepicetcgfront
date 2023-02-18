import React from "react";

import "../components/css/board.css";
import LifeContainer from "./lifeArea";
import CharacterArea from "./characterArea";
import LeaderArea from "./leaderArea";
import DonArea from "./donArea";
import HandArea from "./handArea";

function Board() {
  return (
    <>
      <section className="tablero">
        <LifeContainer></LifeContainer>
        <CharacterArea></CharacterArea>
        <LeaderArea></LeaderArea>
        <DonArea></DonArea>
        <HandArea></HandArea>
      </section>
    </>
  );
}

export default Board;
