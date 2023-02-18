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
} from "../services/socketEvents";

const views = {
  duel: <VsPlayer />,
  rockScissorPaper: <RockScissorPaper />,
  waitingArea: <WatingArea />,
};

function wrapper() {
  const history = useNavigate();
  const [view, setView] = useState("duel");

  const { sockets: hookSocket } = useContext(Store.DuelContext).hooks;
  const { duelSocket, duelRoom, initDuelSocket, joinRoom, SOCKET_DUEL_URL } = hookSocket;

  useEffect(() => {
    initDuelSocket();

    return () => {
      duelSocket && duelSocket.close();
      duelSocket && duelSocket.disconnect();
    };
  }, []);

  if (duelSocket) {
    onDuelConnected(duelSocket, (data) => {
      console.log("data", data);
      joinRoom(SOCKET_DUEL_URL, data.room);
    });

    onRockScissorPaperStart(duelSocket, (data) => {
      setView("rockScissorPaper");
    });

    onRockScissorPaperResult(duelSocket, (data) => {
      console.log("Do I win? :", data.result === duelSocket.id);
      if (data.result) {
        setView("duel");
      }
    });

    onDuelCanceled(duelSocket, (data) => {
      if (data.players.includes(duelSocket.id)) {
        duelSocket.leave(duelRoom);
        history.push("/duels");
      }
    });
  }

  return <>{views[view]}</>;
}

export default wrapper;
