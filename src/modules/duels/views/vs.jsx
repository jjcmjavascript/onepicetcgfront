import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RockScissorPaper from "../components/rockScissorPaper";
import WatingArea from "../components/waitingArea";
import Store from "../provider/duelProvider";
import VsPlayer from "./vsPlayer";

import {
  onDuelConnected,
  onDuelCanceled,
  onRockScissorPaperResult,
  onRockScissorPaperStart,
  emitDeckSelected,
} from "../services/socketEvents";

const views = {
  duel: <VsPlayer />,
  rockScissorPaper: <RockScissorPaper />,
  waitingArea: <WatingArea />,
};

function wrapper() {
  const history = useNavigate();

  const [view, setView] = useState("waitingArea");

  const { states, hooks } = useContext(Store.DuelContext);

  const { selectedDeck: selectedDeckState } = states;
  const { sockets: hookSocket } = hooks;

  const { duelSocket, duelRoom, initDuelSocket, joinRoom, SOCKET_DUEL_URL } =
    hookSocket;
  const [selectedDeck] = selectedDeckState;

  useEffect(() => {
    initDuelSocket();

    if (!selectedDeck) {
      history("/duels");
    }

    return () => {
      duelSocket && duelSocket.close();
      duelSocket && duelSocket.disconnect();
    };
  }, []);

  useEffect(()=>{
    duelSocket && emitDeckSelected(duelSocket, { deckId: selectedDeck.id });
  },[duelSocket]);

  if (duelSocket) {
    onDuelConnected(duelSocket, (data) => {
      joinRoom(SOCKET_DUEL_URL, data.room);
    });

    onRockScissorPaperStart(duelSocket, (data) => {
      setView("rockScissorPaper");
    });

    onRockScissorPaperResult(duelSocket, (data) => {
      if (data.result) {
        setView("duel");
      }
    });

    onDuelCanceled(duelSocket, (data) => {
      if (data.players.includes(duelSocket.id)) {
        duelSocket.leave(duelRoom);
        history("/duels");
      }
    });
  }

  return <>{views[view]}</>;
}

export default wrapper;
