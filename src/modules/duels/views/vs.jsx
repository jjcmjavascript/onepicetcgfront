import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Store from "../provider/duelProvider";

import RockScissorPaper from "../components/rockScissorPaper";
import WatingArea from "../components/waitingArea";
import VsPlayer from "../components/vsPlayer";

import {
  onDuelConnected,
  onDuelCanceled,
  onRockScissorPaperResult,
  onRockScissorPaperStart,
  emitDeckSelected,
  onGameBoardStateChange,
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

  const { selectedDeck: selectedDeckState, boardOne } = states;
  const { sockets: hookSocket } = hooks;

  const [, setBoardOneState] = boardOne;

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

  useEffect(() => {
    duelSocket && emitDeckSelected(duelSocket, { deckId: selectedDeck.id });
  }, [duelSocket]);

  if (duelSocket) {
    onDuelConnected(duelSocket, (payload) => {
      joinRoom(SOCKET_DUEL_URL, payload.room);
    });

    onRockScissorPaperStart(duelSocket, (payload) => {
      setView("rockScissorPaper");
    });

    onRockScissorPaperResult(duelSocket, (payload) => {
      if (payload.result) {
        setView("duel");
      }
    });

    onDuelCanceled(duelSocket, (payload) => {
      if (payload.players.includes(duelSocket.id)) {
        duelSocket.leave(duelRoom);
        history("/duels");
      }
    });

    onGameBoardStateChange(duelSocket, (payload) => {
      setBoardOneState((currentBoard) => {
        return { ...currentBoard, ...payload.board };
      });
    });
  }

  return <>{views[view]}</>;
}

export default wrapper;
