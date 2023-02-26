import React from "react";

import "../css/board.css";
import LifeContainer from "./lifeArea";
import CharacterArea from "./characterArea";
import LeaderArea from "./leaderArea";
import DonArea from "./donArea";
import HandArea from "./handArea";

function Board({ className = ''}) {
  return (
    <>
      <section className={"tablero " + className}>
        <LifeContainer className="life"></LifeContainer>
        <CharacterArea className="tablero-arriba"></CharacterArea>
        <LeaderArea className="tablero-arriba-dos"></LeaderArea>
        <DonArea className="tablero-abajo"></DonArea>
        <HandArea className="mano"></HandArea>
      </section>
    </>
  );
}

export default Board;
