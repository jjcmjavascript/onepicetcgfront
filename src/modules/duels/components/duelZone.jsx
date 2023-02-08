import React, { useCallback, useContext, useEffect, useRef } from "react";

import CharacterZone from "./characterArea/characterZone";
import DonZone from "./donArea/donZone";
import HandZone from "./handArea/handZone";
import LeaderZone from "./leaderArea/leaderZone";
import RevealCard from "./revealCard";
import TrashModal from "./trashModal/trashModal";
import LifeCardHalf from "./LifeCardHalf";
import Store from "../provider/duelProvider";

import "./css/test.css";

function DuelZone({ children, rotate }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [board, setBoard] = boardOne;

  const { socket, setActiveRooms, rooms } = hooks.socket;

  if (socket) {
    socket.on("duel:connected", (data) => {
      setActiveRooms("duel", data.room);
    });

    socket.on("duel:started", (data) => {});

    socket.on("duel:removeLife", (data) => {
      console.log(data);
    });

    socket.on("duel:setBoard", (data) => {
      console.log(data);

      if (data.id == socket.id) {
        setBoard(data.board);
      }
    });
  }

  const removeLife = (life) => {
    socket.emit("duel:removeLife", { life, room: rooms.duel });
  };

  const chooseRockPaperScissors = () => {
    socket.emit("duel:playerSelected", {
      player: socket.id,
      room: rooms.duel,
    });
  };

  return (
    <>
      <div className={`field ${rotate ? "rotated" : ""}`}>
        <div>
          <RevealCard />
          <TrashModal />
          <CharacterZone />
          <DonZone />
          <LeaderZone />
          <HandZone />
        </div>

        <div className="lives">
          <span className="rotate270">Vidas</span>
          <button onClick={chooseRockPaperScissors}>
            Rock Paper Scissors
          </button>

          {board.lives.map((live) => {
            return (
              <LifeCardHalf
                card={live}
                key={live.uuid}
                onClick={() => chooseRockPaperScissors(live)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DuelZone;
