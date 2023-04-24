import React, { createContext, useState, useEffect, useRef } from "react";

import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";

import * as effectRules from "../../../services/effectRules";

import BoardGenerator from "../../../services/BoardGenerator";
import GameState from "../../../models/GameState";
import constants from "../services/constants";
import ActiveCard from "../../../models/ActiveCard";

import { pause } from "../../../helpers";

const State = GameState.getDefault();
const Board = new BoardGenerator({}).generateDeckStructure().merge({
  id: 0,
});
const EnemyBoard = new BoardGenerator({}).generateDeckStructure();
const ActiveCardSchema = ActiveCard.getDefault();

const DuelContext = createContext();

function* generator(effects) {
  for (let i = 0; i < effects.length; i++) {
    yield effects[i];
  }
}

async function iterator(generator) {
  for (let value of generator) {
    await pause.sleep(50);
    await value();
  }
}

function DuelProvider({ children }) {
  const boardOne = useState(Board);
  const boardTwo = useState(EnemyBoard);
  const gameState = useState(State);
  const sockets = useSocket();

  const activeCard = useRef(ActiveCardSchema);
  const activesCards = useState(ActiveCardSchema);

  const [game, setGameState] = gameState;
  const [board, setBoard] = boardOne;

  const [, setActiveCard] = activesCards;
  const generatorParams = useRef(new Map());

  const modesToMergeWithAll = [
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
    activeCards: activesCards, //No usar
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
    resolve({ where, name }) {
      const card = activeCard.current[where];
      const effect = card.effects[name];
      const chaing = effect.chaing;
      const arrayMethods = Object.values(chaing).map((chaingPart) => {
        generatorParams.current.set(chaingPart.name, chaingPart.params);
        return () => this[chaingPart.name].call(this, chaingPart.params);
      });

      iterator(generator(arrayMethods));
    },

    setMode(params) {
      const { mode } = params;

      setGameState((state) =>
        state.merge({
          mode,
        })
      );
    },

    initPlayCard() {
      const card = activeCard.current.hand;

      this.playCard(card);
    },

    initReplaceCharacter() {
      this.setMode({ mode: "select:character:to:replace" });
      this.lockAllExcept({ exeptions: ["character"] });
      this.activateCharacterSelectorAll();
    },

    /******************************************/
    /******** EFFECTS ***********************/
    /****************************************/

    emitBoard() {},

    mergeActiveCard(card, type) {
      if (board.lockeds[type]) return;

      const state = activeCard.current;

      if (game.mode === "select:character:leader") {
        activeCard.current = state.set({
          [type]: card,
          don: state.don,
        });
      } else if (modesToMergeWithAll.includes(game.mode)) {
        activeCard.current = state.merge({
          [type]: card,
        });
      } else if (type === "clean") {
        activeCard.current = state.getDefault();
      } else {
        activeCard.current = state.set({
          [type]: card,
        });
      }

      setActiveCard(activeCard.current);
    },

    async awaitSelection() {
      return new Promise((resolve) => {
        const handlerClick = (event) => {
          const { target } = event;

          if (target.name === "buttonToWait") {
            resolve();
            document.body.removeEventListener("click", handlerClick);
          }
        };

        document.body.addEventListener("click", handlerClick);
      });
    },

    lockAllExcept(params) {
      const { exeptions } = params;
      setBoard((state) => state.lockAllExcept(exeptions));
    },

    unlockAll() {
      setBoard((state) => state.unlockAll());
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

    addAttack(params) {
      const { amount, targets } =
        params || generatorParams.current.get("addAttack");

      const [cardType, card] = Object.entries(activeCard.current).find(
        ([type, value]) => value != null && targets.includes(type)
      );

      setBoard((state) => {
        let leader =
          cardType === "leader"
            ? { ...card, powerAdded: [...card.powerAdded, amount] }
            : state.leader;

        let characters =
          cardType === "character"
            ? state.characters.map((item) => {
                let powerAdded = item.powerAdded;

                if (item.uuid == card.uuid) {
                  powerAdded = [...item.powerAdded, amount];
                }

                return {
                  ...item,
                  powerAdded,
                };
              })
            : state.characters;

        return state.merge({
          leader,
          characters,
        });
      });
    },

    addAttackToAll(params) {
      const { amount } = params;

      setBoard((state) =>
        state.merge({
          characters: state.characters.map((character) => {
            return {
              ...character,
              powerAdded: [...character.powerAdded, amount],
            };
          }),
        })
      );
    },

    setActiveDonUnderCard() {
      const don = activeCard.current.don;
      const [type, card] = Object.entries(activeCard.current).find(
        ([, value]) => value != null && value.uuid !== don.uuid
      );

      setBoard((state) => {
        let object = {
          costs: state.costs.filter((item) => item.uuid !== don.uuid),
        };

        if (type === "leader") {
          object["leader"] = {
            ...state.leader,
            overCards: [...state.leader.overCards, { ...don, rested: true }],
          };
        } else if (type === "character") {
          object["characters"] = state.characters.map((item) => {
            if (item.uuid === card.uuid) {
              return {
                ...item,
                overCards: [...item.overCards, { ...don, rested: true }],
              };
            }

            return item;
          });
        }

        return state.merge(object);
      });
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
    },

    replaceCharacter() {
      const { character, hand } = activeCard.current;

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
      this.mergeActiveCard(null, "clean");
    },

    cleanGameMode() {
      setGameState((state) =>
        state.merge({
          mode: "",
        })
      );
    },

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

      generatorParams.current.clear();
    },
  };

  const conditions = {
    resolve({ where, name }) {
      const currentCard = activeCard.current[where];
      const effect = currentCard.effects[name];
      const chaing = effect.conditions;

      return chaing.every((rule) => {
        return effectRules[rule.name]({
          board,
          game,
          activesCards,
          currentCard,
          params: rule.params,
        });
      });
    },

    costs() {
      const don = activeCard.current.don;
      return effectRules.costs({ board, don });
    },
    attack() {
      const card = activeCard.current.character;
      return effectRules.attack({ board, card, game });
    },
    canAddAtkFromDon() {
      const don = activeCard.current.don;
      return effectRules.canAddAtkFromDon({ game, don });
    },
    canShowSelectToAddAtkFromDon() {
      return effectRules.canShowSelectToAddAtkFromDon({
        activeCards: activeCard.current,
        game,
        board,
      });
    },
    rest() {
      const card = activeCard.current.don || activeCard.current.character;
      return effectRules.rest({ board, card });
    },
    characterSelect(card) {
      return effectRules.characterSelect({ game, card });
    },
    canActiveEffect() {
      return effectRules.canActiveEffect({
        activeCards: activeCard.current,
        game,
        board,
      });
    },
    canReplaceCharacter() {
      return effectRules.canReplaceCharacter({
        card: activeCard.current.hand,
        game,
        board,
      });
    },
    canPlayCardCharacter() {
      return effectRules.canPlayCardCharacter({
        card: activeCard.current.hand,
        game,
        board,
      });
    },
    canReplaceCharacterForPlay() {
      return effectRules.canReplaceCharacterForPlay({
        activeCards: activeCard.current,
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
