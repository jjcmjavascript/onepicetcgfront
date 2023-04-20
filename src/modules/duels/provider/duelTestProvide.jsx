import React, { createContext, useState, useEffect, useRef } from "react";

import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";

import * as effectRules from "../../../services/effectRules";

import BoardGenerator from "../../../services/BoardGenerator";
import GameState from "../../../models/GameState";
import constants from "../services/constants";
import ActiveCard from "../../../models/ActiveCard";

const State = GameState.getDefault();
const Board = new BoardGenerator({}).generateDeckStructure().merge({
  id: 0,
});
const EnemyBoard = new BoardGenerator({}).generateDeckStructure();
const ActiveCardSchema = ActiveCard.getDefault();

const DuelContext = createContext();

function* resolver(effects) {
  for (let i = 0; i < effects.length; i++) {
    yield effects[i]();
  }
}

function DuelProvider({ children }) {
  const boardOne = useState(Board);
  const boardTwo = useState(EnemyBoard);
  const gameState = useState(State);
  const activeCard = useState(ActiveCardSchema);
  const sockets = useSocket();

  const [game, setGameState] = gameState;
  const [board, setBoard] = boardOne;
  const [activeCards, setActiveCards] = activeCard;

  const activeGenerator = useRef(null);

  const modesToMerge = [
    "select:character:to:replace",
    "select:character:leader",
  ];

  const {
    duelSocket,
    initDuelSocket,
    stopDuelSocket,
    joinRoom,
    duelRoom,
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
    isMyTurn() {
      return game.currentTurnPlayerId === board.id;
    },

    finishTurn() {
      duelSocket.emit(constants.GAME_TURN_END, {
        room: duelRoom,
      });
    },

    /******************************************/
    /******** SOCKET EFFECTS *****************/
    /****************************************/
    next() {
      if (activeGenerator.current) {
        setTimeout(() => {
          activeGenerator.current.next();
        }, 100);
      }
    },

    resolve(name) {
      const card =
        activeCards.don || activeCards.leader || activeCards.character;

      const effect = card.effects[name];
      const chaing = effect.chaing;
      const arrayMethods = Object.values(chaing).map((chaingPart) => {
        return () => this[chaingPart.name].call(this, ...chaingPart.params);
      });

      activeGenerator.current = resolver(arrayMethods);

      this.next();
    },

    initSumAttackFromDonEvent() {
      setGameState((state) =>
        state.merge({
          mode: "select:character:leader",
        })
      );

      this.lockAllExcept(["character", "leader"]);
      this.activateCharacterSelectorAll();
      this.activateLeaderSelector();
    },

    initPlayCard() {
      const card = activeCards.hand;

      this.playCard(card);
    },

    initReplaceCharacter() {
      setGameState((state) =>
        state.merge({
          mode: "select:character:to:replace",
        })
      );

      this.lockAllExcept(["character"]);

      this.activateCharacterSelectorAll();
    },

    /******************************************/
    /******** EFFECTS ***********************/
    /****************************************/
    cancel() {
      this.cleanGameMode();
      this.cleanActiveCards();
      this.cleanCharacterSelectorAll();
      this.cleanLeaderSelector();
      this.unlockAll();
    },

    cleanAll() {
      this.cleanGameMode();
      this.cleanActiveCards();
      this.cleanCharacterSelectorAll();
      this.cleanLeaderSelector();
      this.unlockAll();
      activeGenerator.current = null;
    },

    lockAllExcept(names) {
      setBoard((state) => state.lockAllExcept(names));
    },

    unlockAll() {
      setBoard((state) => state.unlockAll());
    },

    mergeActiveCard(card, type) {
      if (board.lockeds[type]) return;

      if (modesToMerge.includes(game.mode)) {
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

    plusAttakFromDon() {
      const { character, leader, don } = activeCards;

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

      this.next();
    },

    addAttactToCharacter(card, attack = 1000) {
      let newCard = { ...card };
      newCard.powerAdded = [...newCard.powerAdded, attack];

      setBoard((state) =>
        state.merge({
          characters: state.characters.map((character) => {
            if (character.uuid == card.uuid) {
              return newCard;
            }
            return character;
          }),
        })
      );

      this.next();
    },

    addAttactToAllCharacters(attack = 1000) {
      setBoard((state) =>
        state.merge({
          characters: state.characters.map((character) => {
            return {
              ...character,
              powerAdded: [...character.powerAdded, attack],
            };
          }),
        })
      );
      this.next();
    },

    playCard(card) {
      setBoard((state) =>
        state.merge({
          hand: state.hand.filter((handCard) => handCard.uuid !== card.uuid),
          characters: [...state.characters, card],
        })
      );

      this.cleanAll();
    },

    restedMultipleDons(quantity = 1) {
      setBoard((state) => {
        let costs = state.costs;

        if (quantity > 0) {
          costs = state.costs.map((cost) => {
            const canRested = !cost.rested && quantity > 0;
            canRested && quantity--;

            return {
              ...cost,
              rested: canRested ? true : cost.rested,
            };
          });
        }

        return state.merge({
          costs,
        });
      });

      this.next();
    },

    replaceCharacter() {
      const { character, hand } = activeCards;

      setBoard((state) =>
        state.merge({
          hand: state.hand.filter((handCard) => handCard.uuid !== hand.uuid),
          characters: state.characters.map((currentCharacter) => {
            return currentCharacter.uuid == character.uuid
              ? hand
              : currentCharacter;
          }),
          trash: [...state.trash, character],
        })
      );

      this.cleanAll();
    },
    /******************************************/
    /******** END EFFECTS *********************/
    /******************************************/
    endSumAttackFromDonEvent() {
      this.cleanAll();
    },

    /******************************************/
    /******** CLEANERS ***********************/
    /****************************************/
    cleanCharacterSelectorAll() {
      setBoard((state) =>
        state.merge({
          characters: state.characters.map((character) => {
            return { ...character, toSelect: false };
          }),
        })
      );
    },

    cleanLeaderSelector() {
      setBoard((state) =>
        state.merge({
          leader: {
            ...state.leader,
            toSelect: false,
          },
        })
      );
    },

    cleanActiveCards() {
      setActiveCards((state) => state.getDefault());
    },

    cleanGameMode() {
      setGameState((state) =>
        state.merge({
          mode: "",
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
    canReplaceCharacter() {
      return effectRules.canReplaceCharacter({
        card: activeCards.hand,
        game,
        board,
      });
    },
    canPlayCardCharacter() {
      return effectRules.canPlayCardCharacter({
        card: activeCards.hand,
        game,
        board,
      });
    },
    canReplaceCharacterForPlay() {
      return effectRules.canReplaceCharacterForPlay({
        activeCards,
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
