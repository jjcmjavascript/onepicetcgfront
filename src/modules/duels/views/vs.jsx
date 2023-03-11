import React, { useState, useContext, useEffect, useCallback } from "react";
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

    if (duelSocket) {
      duelSocket.emit(constants.GAME_DECK_SELECTED, {
        deckId: selectedDeck.id,
      });

      duelSocket.on(constants.GAME_ROOM_JOIN, (payload) => {
        joinRoom(SOCKET_DUEL_URL, payload.room);
      });
    }

    return () => {
      duelSocket && duelSocket.close();
      duelSocket && duelSocket.disconnect();
    };
  }, [duelSocket]);

  if (duelSocket) {
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
        duelSocket.leave(hookSocket.duelRoom);
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
          room: payload.room,
          mulligan: result.isConfirmed,
        });
      });
    });

    duelSocket.on(constants.GAME_MULLIGAN, (payload) => {
      setBoardOneState(payload.board);
    });

    duelSocket.on(constants.GAME_PHASES_DRAW, (payload) => {
      setBoardOneState(payload.board);
    });

    duelSocket.on(constants.GAME_RIVAL_PHASES_REFRESH, (payload) => {
      console.log("refreshOut");
    });
    duelSocket &&
      duelSocket.on(constants.GAME_PHASES_REFRESH, (payload) => {
        console.log("refreshIn");

        duelSocket.emit(constants.GAME_PHASES_REFRESH_END, {
          room: payload.room,
        });
      });
  }

  useCallback(() => {}, [duelSocket]);

  return <>{views[view]}</>;
}

export default wrapper;
