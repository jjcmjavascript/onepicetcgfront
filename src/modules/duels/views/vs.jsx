import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Store from "../provider/duelProvider";
import Swal from "sweetalert2";

import RockScissorPaper from "../components/rockScissorPaper";
import WatingArea from "../components/waitingArea";
import VsPlayer from "../components/vsPlayer";
import TurnSelector from "../components/turnSelector";

import constants from "../services/constants";

const views = {
  duel: <VsPlayer />,
  rockScissorPaper: <RockScissorPaper />,
  waitingArea: <WatingArea />,
  turnSelector: <TurnSelector />,
};

function wrapper() {
  const history = useNavigate();
  const { states, hooks } = useContext(Store.DuelContext);
  const [view, setView] = useState("waitingArea");

  const { sockets: hookSocket } = hooks;
  const {
    selectedDeck: selectedDeckState,
    boardOne,
    boardTwo,
    gameState,
  } = states;

  const [, setBoardOneState] = boardOne;
  const [, setBoardTwoState] = boardTwo;
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

    duelSocket.on(constants.GAME_TURN_SELECTION_INIT, (payload) => {
      console.log(constants.GAME_TURN_SELECTION_INIT);

      if (payload.playerId) {
        setView(
          payload.playerId === duelSocket.id ? "turnSelector" : "waitingArea"
        );
      }
    });

    duelSocket.on(constants.GAME_TURN_SELECTION_END, (payload) => {
      setView("duel");
    });

    duelSocket.on(constants.GAME_INITIAL_BOARD_STATE, (payload) => {
      setBoardOneState((currentBoard) => {
        return { ...currentBoard, ...payload.board };
      });

      setBoardTwoState((currentBoard) => {
        return { ...currentBoard, ...payload.rivalBoard };
      });
    });

    duelSocket.on(constants.GAME_STATE, (payload) => {
      console.log(constants.GAME_STATE);
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
      console.log(constants.GAME_MULLIGAN);

      setBoardOneState(payload.board);
    });

    duelSocket.on(constants.GAME_RIVAL_MULLIGAN, (payload) => {
      console.log(constants.GAME_RIVAL_MULLIGAN);

      setBoardTwoState(payload.board);
    });

    duelSocket.on(constants.GAME_PHASES_REFRESH, (payload) => {
      console.log(constants.GAME_PHASES_REFRESH);

      setBoardOneState(payload.board);

      duelSocket.emit(constants.GAME_PHASES_REFRESH_END, {
        room: payload.room,
      });
    });

    duelSocket.on(constants.GAME_RIVAL_PHASES_REFRESH, (payload) => {
      console.log(constants.GAME_RIVAL_PHASES_REFRESH);

      setBoardTwoState((currentBoard) => {
        return { ...currentBoard, ...payload.board };
      });
    });

    duelSocket.on(constants.GAME_PHASES_DRAW, (payload) => {
      console.log(constants.GAME_PHASES_DRAW);

      setBoardOneState((currentBoard) => {
        return { ...currentBoard, ...payload.board };
      });

      duelSocket.emit(constants.GAME_PHASES_DRAW_END, {
        room: payload.room,
      });
    });

    duelSocket.on(constants.GAME_RIVAL_PHASES_DRAW, (payload) => {
      console.log(constants.GAME_RIVAL_PHASES_DRAW);

      setBoardTwoState((currentBoard) => {
        return { ...currentBoard, ...payload.board };
      });
    });

    duelSocket.on(constants.GAME_PHASES_DON, (payload) => {
      console.log(constants.GAME_PHASES_DON);

      setBoardOneState((currentBoard) => {
        return { ...currentBoard, ...payload.board };
      });

      duelSocket.emit(constants.GAME_PHASES_DON_END, {
        room: payload.room,
      });
    });

    duelSocket.on(constants.GAME_RIVAL_PHASES_DON, (payload) => {
      console.log(constants.GAME_RIVAL_PHASES_DON);

      setBoardTwoState((currentBoard) => {
        return { ...currentBoard, ...payload.board };
      });
    });

    duelSocket.on(constants.GAME_PHASES_MAIN, (payload) => {
      console.log(constants.GAME_PHASES_MAIN);
    });

    duelSocket.on(constants.GAME_RIVAL_PHASES_MAIN, (payload) => {
      console.log(constants.GAME_RIVAL_PHASES_MAIN);
    });

    // duelSocket.on(constants.GAME_PHASE_END, (payload) => {
    //   console.log(constants.GAME_PHASE_END);
    // });

    // duelSocket.on(constants.GAME_RIVAL_PHASES_END, (payload) => {
    //   console.log(constants.GAME_RIVAL_PHASES_END);
    // });

    duelSocket.on(constants.GAME_DON_PLUS, (payload) => {
      console.log(constants.GAME_DON_PLUS);
    });

    duelSocket.on(constants.GAME_RIVAL_DON_PLUS, (payload) => {
      console.log(constants.GAME_RIVAL_DON_PLUS);
    });
  }

  return <>{views[view]}</>;
}

export default wrapper;
