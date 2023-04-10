import React, { createContext, useState, useEffect } from "react";

import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";

import BoardGenerator from "../../../services/BoardGenerator";
import * as effectRules from "../../../services/effectRules";
import GameState from "../../../models/GameState";
import Player from "../../../models/Player";
import constants from "../services/constants";
import { pause } from "../../../helpers";

const boardOne = new BoardGenerator({}).generateBoard();
const enemyBoard = new BoardGenerator({}).generateBoard();
const gameState = GameState.getDefault();
const DuelContext = createContext();
const activeCards = {
  don: null,
  character: null,
  hand: null,
  trash: null,
};

function DuelProvider({ children }) {
  const states = {
    boardOne: useState(boardOne),
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
    activeCards: useState(activeCards),
    activeMenu: useState(null),
    closeMenus: useState(false),
  };

  const [game, setGameState] = states.gameState;
  const [board, setBoard] = states.boardOne;
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

    activeSelectToAddAttackFromDon(don) {
      setCloseMenus(true);

      setActiveCards((currentActiveCards) => {
        return {
          ...currentActiveCards,
          don,
        };
      });

      this.activateCharacterSelectorAll();
    },

    activateCharacterSelectorAll() {
      setNewGameState({
        mode: "select:character",
      });

      setNewBoard(({ board }) => {
        const characters = board.characters.map((character) => {
          character.toSelect = true;
          return character;
        });

        return {
          characters,
        };
      });
    },

    async deactivateCharacterSelectorAll() {
      await pause.sleep(100);
      setCloseMenus(false);

      setActiveCards({ ...activeCards });

      setNewGameState({
        mode: "",
      });

      setNewBoard(({ board }) => {
        const characters = board.characters.map((character) => {
          character.toSelect = false;
          return character;
        });

        return {
          characters,
        };
      });
    },

    async plusAttakFromDon(character) {
      setCloseMenus(false);
      await pause.sleep(100);
      setCloseMenus(true);

      setNewBoard(({ board }) => {
        const costs = board.costs.filter(
          (cost) => cost.uuid != activeCards.don.uuid
        );

        const characters = board.characters.map((currentCharacter) => {
          if (currentCharacter.uuid === character.uuid) {
            currentCharacter.powerAdded =
              currentCharacter.powerAdded.concat(1000);
            currentCharacter.overCards = currentCharacter.overCards.concat(
              activeCards.don
            );
          }

          return currentCharacter;
        });

        return {
          costs,
          characters,
        };
      });

      this.deactivateCharacterSelectorAll();
    },

    restedMultipleDons(quantity = 1) {
      const avaibleDons = board.costs.filter((item) => !item.rested);
      const newRested = avaibleDons.slice(0, quantity).map((don) => {
        return {
          ...don,
          rested: true,
        };
      });

      setBoard((currentBoard) => {
        return {
          ...currentBoard,
          costs: currentBoard.costs.map((cost) => {
            const newDon = newRested.find((don) => don.uuid == cost.uuid);
            if (newDon) return newDon;

            return cost;
          }),
        };
      });
    },

    addAttactToAllCharacters(attack = 1000) {
      setBoard((currentBoard) => {
        return {
          ...currentBoard,
          characters: currentBoard.characters.map((currentCharacter) => {
            return {
              ...currentCharacter,
              powerAdded: [...currentCharacter.powerAdded, attack],
            };
          }),
        };
      });
    },
  };

  const conditions = {
    costs(don) {
      return effectRules.costs({ board, don });
    },
    attack(card) {
      return effectRules.attack({ board, card, game });
    },
    addAtkFromDon(don) {
      return effectRules.addAtkFromDon({ board, game, don });
    },
    rest(card) {
      return effectRules.rest({ board, card });
    },
    donSelect(card) {
      return effectRules.donSelect({ game, card });
    },
    characterSelect(card) {
      return effectRules.characterSelect({ game, card });
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
        setNewBoard(payload.board);
        setNewGameState(payload.game);
      });
    }
  }, [duelSocket]);

  const setNewBoard = (data) => {
    setBoard((state) => {
      if (typeof data === "function") {
        data = data({ board: state });
      }

      return new Player({
        ...state,
        ...data,
      });
    });
  };

  const setNewGameState = (game) => {
    setGameState(
      (state) =>
        new GameState({
          ...state,
          ...game,
        })
    );
  };

  return (
    <DuelContext.Provider value={{ states, hooks, actions, conditions }}>
      {children}
      <button onClick={initDuelSocket}>Start</button>
      <button onClick={stopDuelSocket}>Stop</button>
      <button onClick={initState}>Init State</button>
    </DuelContext.Provider>
  );
}
export default { DuelProvider, DuelContext };
