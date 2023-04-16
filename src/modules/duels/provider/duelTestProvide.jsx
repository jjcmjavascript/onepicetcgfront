import React, { createContext, useState, useEffect } from "react";

import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";

import * as effectRules from "../../../services/effectRules";

import BoardGenerator from "../../../services/BoardGenerator";
import GameState from "../../../models/GameState";
import Player from "../../../models/Player";
import constants from "../services/constants";
import ActiveCard from "../../../models/ActiveCard";

const State = GameState.getDefault();
const Board = new BoardGenerator({}).generateBoard();
const EnemyBoard = new BoardGenerator({}).generateBoard();
const ActiveCardSchema = ActiveCard.getDefault();

const DuelContext = createContext();

function DuelProvider({ children }) {
  const boardOne = useState(Board);
  const boardTwo = useState(EnemyBoard);
  const gameState = useState(State);
  const activeCard = useState(ActiveCardSchema);
  const sockets = useSocket();

  const [game, setGameState] = gameState;
  const [board, setBoard] = boardOne;
  const [activeCards, setActiveCards] = activeCard;

  const {
    duelSocket,
    initDuelSocket,
    stopDuelSocket,
    joinRoom,
    SOCKET_DUEL_URL,
  } = sockets;

  const states = {
    boardOne,
    boardTwo,
    gameState,
    activeCards: activeCard,
    preview: useState(null),
    showTrashModal: useState(false),
    decks: useState([]),
    selectedDeck: useState(""),
  };

  const hooks = {
    sockets,
  };

  const actions = {
    // events initializers
    finishTurn() {},

    initSumAttackFromDonEvent() {
      console.log(constants.GAME_DON_PLUS);
      // duelSocket.emit(constants.GAME_DON_PLUS, {
      //   room: duelRoom,
      //   donUuid: card.uuid,
      // });

      setGameState((state) =>
        state.merge({
          mode: "select:character:leader",
        })
      );
      this.activateCharacterSelectorAll();
      this.activateLeaderSelector();
    },

    endSumAttackFromDonEvent() {
      setActiveCards((state) => state.getDefault());

      setGameState((state) =>
        state.merge({
          mode: "",
        })
      );

      this.desactivateCharacterSelectorAll();
      this.desactivateLeaderSelector();
    },

    initPlayCard() {
      const card = activeCards.hand;

      this.playCard(card);
    },

    // setters
    mergeActiveCard(card, type) {
      if (["select:character:leader"].includes(game.mode)) {
        setActiveCards((state) =>
          state.merge({
            [type]: card,
          })
        );
      } else {
        setActiveCards((state) =>
          state.set({
            [type]: card,
          })
        );
      }
    },

    activateLeaderSelector() {
      setBoard((state) =>
        state.merge({
          leader: {
            ...state.leader,
            toSelect: true,
          },
        })
      );
    },

    activateCharacterSelectorAll() {
      setBoard((state) =>
        state.merge({
          characters: state.characters.map((character) => {
            return { ...character, toSelect: true };
          }),
        })
      );
    },

    desactivateCharacterSelectorAll() {
      setBoard((state) =>
        state.merge({
          characters: state.characters.map((character) => {
            return { ...character, toSelect: false };
          }),
        })
      );
    },

    desactivateLeaderSelector() {
      setBoard((state) =>
        state.merge({
          leader: {
            ...state.leader,
            toSelect: false,
          },
        })
      );
    },

    plusAttakFromDon() {
      const { character, leader, don } = activeCards;
      console.log(activeCards);

      setBoard((state) =>
        state.merge({
          costs: state.costs.filter((cost) => cost.uuid != don.uuid),
          leader: {
            ...state.leader,
            powerAdded: leader
              ? [...state.leader.powerAdded, 1000]
              : state.leader.powerAdded,
            overCards: leader
              ? [...state.leader.overCards, don]
              : state.leader.overCards,
          },

          characters: character
            ? state.characters.map((item) => {
                let powerAdded = item.powerAdded;
                let overCards = item.overCards;

                if (item.uuid == character.uuid) {
                  powerAdded = [...item.powerAdded, 1000];
                  overCards = [...item.overCards, don];
                }

                return {
                  ...item,
                  powerAdded,
                  overCards,
                };
              })
            : state.characters,
        })
      );

      this.endSumAttackFromDonEvent();
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

    playCard(card) {
      setBoard((state) =>
        state.merge({
          hand: state.hand.filter((handCard) => handCard.uuid !== card.uuid),
          characters: [...state.characters, card],
        })
      );

      this.restedMultipleDons(card.cost);
    },

    restedMultipleDons(quantity = 1) {
      setBoard((state) =>
        state.merge({
          costs: state.costs.map((cost) => {
            quantity--;
            return {
              ...cost,
              rested: quantity >= 0 ? true : cost.rested,
            };
          }),
        })
      );
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
    canActiveEffect() {
      return effectRules.canActiveEffect({ activeCards, game, board });
    },
    canPlayCard() {
      return effectRules.canPlayCard({
        card: activeCards.hand,
        game,
        board,
      });
    },
  };

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

        setBoard((state) => state.merge(payload.board));

        setGameState((state) => state.merge(payload.game));
      });
    }
  }, [duelSocket]);

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
