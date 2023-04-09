import React, { createContext, useState, useEffect } from "react";

import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";
import BoardGenerator from "../../../services/BoardGenerator";
import * as effectRules from "../../../services/effectRules";
import GameState from "../../../models/GameState";
import constants from "../services/constants";

const board = new BoardGenerator({}).generateBoard();
const enemyBoard = new BoardGenerator({}).generateBoard();
const gameState = GameState.getDefault();

const DuelContext = createContext();

function DuelProvider({ children }) {
  const states = {
    boardOne: useState(board),
    boardTwo: useState(enemyBoard),
    preview: useState(null),
    showTrashModal: useState(false),
    mode: useState("modeSelector"),
    decks: useState([]),
    selectedDeck: useState(""),
    gameState: useState(gameState),
    effectPile: useState({
      who: "",
      restriction: "",
      resolving: false,
      pending: [],
    }),
    activeCards: useState({
      don: null,
      character: null,
      hand: null,
      trash: null,
    }),
    activeMenu: useState(null),
    closeMenus: useState(false),
  };

  const [game, setGameState] = states.gameState;
  const [boardOne, setBoardOneState] = states.boardOne;
  const [effectPile, setEffectPile] = states.effectPile;
  const [activeCards, setActiveCards] = states.activeCards;
  const [, setActiveMenuName] = states.activeMenu;
  const [, setCloseMenus] = states.closeMenus;

  const hooks = {
    sockets: useSocket(),
  };

  const actions = {
    setActiveMenuName(name) {
      setActiveMenuName(name);
    },
    donCanBeRested(don) {
      return effectRules.donCanBeRested(don, boardOne.characters);
    },
    activeSelectoToAddAttackFromDon(don) {
      setActiveCards((currentActiveCards) => {
        return {
          ...currentActiveCards,
          don,
        };
      });

      this.activateCharacterSelectorAll();
    },
    activateCharacterSelectorAll() {
      setCloseMenus(true);

      setBoardOneState((currentBoard) => {
        return {
          ...currentBoard,
          characters: currentBoard.characters.map((character) => {
            return {
              ...character,
              toSelect: true,
            };
          }),
        };
      });

      setEffectPile({
        resolving: true,
        who: "donZone",
        restriction: "character:all",
        pile: [
          {
            who: "donZone",
            effect: "select:1:from:characters",
          },
        ],
      });
    },
    deactivateCharacterSelectorAll() {
      setEffectPile({
        resolving: false,
        who: "",
        restriction: "",
        pile: [],
      });

      setActiveCards({
        don: null,
        character: null,
        hand: null,
        trash: null,
      });

      setBoardOneState((currentBoard) => {
        return {
          ...currentBoard,
          characters: currentBoard.characters.map((character) => {
            return {
              ...character,
              toSelect: false,
            };
          }),
        };
      });

      setCloseMenus(false);
    },
    plusAttakFromDon(character) {
      setBoardOneState((currentBoard) => {
        return {
          ...currentBoard,
          costs: currentBoard.costs.filter((cost) => {
            return cost.uuid != activeCards.don.uuid;
          }),
          characters: currentBoard.characters.map((currentCharacter) => {
            if (currentCharacter.uuid == character.uuid) {
              return {
                ...currentCharacter,
                powerAdded: [...currentCharacter.powerAdded, 1000],
                overCards: [...currentCharacter.overCards, activeCards.don],
              };
            }
            return character;
          }),
        };
      });

      this.deactivateCharacterSelectorAll();
    },
  };

  const {
    duelSocket,
    initDuelSocket,
    stopDuelSocket,
    joinRoom,
    SOCKET_DUEL_URL,
  } = hooks.sockets;

  const initState = () => {
    duelSocket.emit(constants.GAME_FAKE_STATE_CREATE, {
      gameState,
      playerBoard: board,
    });
  };

  useEffect(() => {
    deckService.getDecks().then((decks) => {
      states.decks[1](decks);
    });
  }, []);

  useEffect(() => {
    if (duelSocket) {
      duelSocket.on(constants.GAME_STATE, (payload) => {
        console.log(constants.GAME_STATE);

        setGameState(payload.game);
      });

      duelSocket.on(constants.GAME_FAKE_STATE_CREATED, (payload) => {
        console.log(constants.GAME_FAKE_STATE_CREATED, payload);

        joinRoom(SOCKET_DUEL_URL, payload.room);
        setBoardOneState(payload.board);
        setGameState(payload.game);
      });
    }
  }, [duelSocket]);

  return (
    <DuelContext.Provider value={{ states, hooks, actions }}>
      {children}
      <button onClick={initDuelSocket}>Start</button>
      <button onClick={stopDuelSocket}>Stop</button>
      <button onClick={initState}>Init State</button>
    </DuelContext.Provider>
  );
}
export default { DuelProvider, DuelContext };
