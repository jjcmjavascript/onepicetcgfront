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
const activeCardSchema = {
  don: null,
  character: null,
  hand: null,
  trash: null,
  zone: null,
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
    activeCards: useState(activeCardSchema),
    activeMenu: useState(null),
    closeMenus: useState(false),
  };

  const [game, setGameState] = states.gameState;
  const [board, setBoard] = states.boardOne;
  const [activeCards, setActiveCards] = states.activeCards;
  const [, setActiveMenuName] = states.activeMenu;
  const [, setCloseMenus] = states.closeMenus;

  const hooks = {
    sockets: useSocket(),
  };

  const actions = {
    // events initializers
    finishTurn() {},
    initSumAttackFromDonEvent(card) {
      console.log(constants.GAME_DON_PLUS, card);

      // duelSocket.emit(constants.GAME_DON_PLUS, {
      //   room: duelRoom,
      //   donUuid: card.uuid,
      // });

      setNewGameState({
        mode: "select:character:leader",
      });
      this.activateCharacterSelectorAll();
      this.activateLeaderSelector();
    },

    // setters
    mergeActiveCard(card, type) {
      if (["select:character:leader"].includes(game.mode)) {
        setActiveCards((state) => ({
          ...activeCardSchema,
          don: state.don,
          [type]: card,
        }));
      } else {
        setActiveCards({
          ...activeCardSchema,
          [type]: card,
        });
      }
    },

    activateLeaderSelector() {
      setNewBoard(({ board }) => {
        return {
          leader: {
            ...board.leader,
            toSelect: true,
          },
        };
      });
    },

    activateCharacterSelectorAll() {
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

    deactivateCharacterSelectorAll() {
      setActiveCards({ ...activeCardSchema });

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

    plusAttakFromDon() {
      const { character, leader, don } = activeCards;

      setNewBoard(({ board }) => {
        let newCharacters = board.characters;
        let newLeader = { ...board.leader };
        const costs = board.costs.filter((cost) => cost.uuid != don.uuid);

        if (leader) {
          newLeader.powerAdded = newLeader.powerAdded.concat(1000);
          newLeader.overCards = newLeader.overCards.concat(don);
        } else if (character) {
          newCharacters = board.characters.map((item) => {
            if (item.uuid === item.uuid) {
              item.powerAdded = item.powerAdded.concat(1000);
              item.overCards = item.overCards.concat(don);
            }

            return item;
          });
        }

        return {
          characters: newCharacters,
          leader: newLeader,
          costs,
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
    costs() {
      const don = activeCards.don;
      return effectRules.costs({ board, don });
    },
    attack() {
      const card = activeCards.character;
      return effectRules.attack({ board, card, game });
    },
    canAddAtkFromDon() {
      const don = activeCards.don;
      return effectRules.canAddAtkFromDon({ game, don });
    },
    canShowSelectToAddAtkFromDon() {
      return effectRules.canShowSelectToAddAtkFromDon({
        activeCards,
        game,
        board,
      });
    },
    rest() {
      const card = activeCards.don || activeCards.character;
      return effectRules.rest({ board, card });
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
