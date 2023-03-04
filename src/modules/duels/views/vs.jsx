import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Store from "../provider/duelProvider";
import Swal from "sweetalert2";

import RockScissorPaper from "../components/rockScissorPaper";
import WatingArea from "../components/waitingArea";
import VsPlayer from "../components/vsPlayer";

import constants from "../services/constants";

const views = {
  duel: <VsPlayer />,
  rockScissorPaper: <RockScissorPaper />,
  waitingArea: <WatingArea />,
};

function wrapper() {
  const history = useNavigate();

  const [view, setView] = useState("waitingArea");

  const { states, hooks } = useContext(Store.DuelContext);

  const { selectedDeck: selectedDeckState, boardOne, gameState } = states;
  const { sockets: hookSocket } = hooks;

  const [, setBoardOneState] = boardOne;
  const [game, setGameState] = gameState;

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
  }, [duelSocket]);

  if (duelSocket) {
    duelSocket.emit(constants.GAME_DECK_SELECTED, {
      deckId: selectedDeck.id,
    });

    duelSocket.on(constants.GAME_ROOM_JOIN, (payload) => {
      joinRoom(SOCKET_DUEL_URL, payload.room);
    });

    duelSocket.on(constants.GAME_ROCK_SCISSORS_PAPER_START, (payload) => {
      setView("rockScissorPaper");
    });

    duelSocket.on(constants.GAME_ROCK_SCISSORS_PAPER_RESULT, (payload) => {
      if (payload.result) {
        setView("duel");
      }
    });

    duelSocket.on(constants.DUEL_CANCELED, (payload) => {
      if (payload.players.includes(duelSocket.id)) {
        duelSocket.leave(duelRoom);
        history("/duels");
      }
    });

    duelSocket.on(constants.GAME_BOARD_STATE, (payload) => {
      setBoardOneState((currentBoard) => {
        return { ...currentBoard, ...payload.board };
      });
    });

    duelSocket.on(constants.GAME_STATE, (payload) => {
      setGameState(payload.game);
    });

    duelSocket.on(constants.GAME_PHASES_MULLIGAN, (payload) => {
      Swal.fire({
        title: "Reinicar Mano",
        showCancelButton: true,
        confirmButtonText: "Volver a Robar",
      }).then((result) => {
        duelSocket.emit(constants.GAME_MULLIGAN, {
          room: duelRoom,
          mulligan: result.isConfirmed,
        });
      });
    });

    duelSocket.on(constants.GAME_MULLIGAN, (payload) => {
      if (payload.playerId == duelSocket.id) {
        setBoardOneState(payload.board);
      }
    });

  }
  return <>{views[view]}</>;
}

export default wrapper;
