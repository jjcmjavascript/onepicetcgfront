import { createContext, useState, useEffect, useRef } from "react";

import duelTestProvide from "./duelTestProvide";
import useSocket from "@hooks/useSocket";
import deckService from "@duels/services/deckService";

import * as effectRules from "@duels/services/effectRules";

import constants from "@duels/services/constants";
import { pause } from "@helpers";

import GameState from "@models/GameState";
import Player from "@models/Player";
import ActiveCard from "@models/ActiveCard";

const testMode = import.meta.env.VITE_APP_TEST_BOARD;
const State = GameState.getDefault();
const Board = Player.getDefault();
const EnemyBoard = Player.getDefault();
const ActiveCardSchema = ActiveCard.getDefault();

const defaultActiveEffect = {
  card: null,
  effectNamesAndParams: new Map(),
  affectedCards: new Set(),
};

function* generator(effects) {
  for (let i = 0; i < effects.length; i++) {
    yield effects[i];
  }
}

const DuelContext = createContext();

function DuelProvider({ children }) {
  const boardOne = useState(Board);
  const boardTwo = useState(EnemyBoard);
  const gameState = useState(State);
  const sockets = useSocket();
  const activeCard = useRef(ActiveCardSchema); //usar
  const activesCards = useState(ActiveCardSchema); //No usar
  const currentEffectPile = useRef(null);
  const stopPile = useRef(false);
  const [game, setGameState] = gameState;
  const [board, setBoard] = boardOne;
  const [, setActiveCard] = activesCards; //No usar

  /**
   * Este ref es para guardar de forma precisa el efecto activo y poder manejar
   * fin fallos las mutaciones de estado que se producen en el juego
   * Almacena la carta que se activa
   * Parametros (estos parametros tienen la estrucutura nombre funcion y params, ejempl:
   * - {name: "setMode", params: {mode: "select:character:to:replace"}} )
   * - Destacar que estas funciones son ejecutadas por el iterador de efectos: iterator(generator(arrayMethods));
   * - Si bien cada funcion recibe automaticamente los parametros que necesita para ejecutarse por el iterador a veces son necesarios parametros adicionales que se almacenan aqui
   * Las cartas afectadas
   */
  const activeCardEffect = useRef({ ...defaultActiveEffect });

  const hooks = { sockets };

  const states = {
    boardOne,
    boardTwo,
    gameState,
    activeCards: activesCards, //No usar
    preview: useState(null),
    showTrashModal: useState(false),
    decks: useState([]),
    selectedDeck: useState(""),
    currentEffectPile,
  };

  const { duelSocket, duelRoom } = sockets;

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
    async iterator(generator) {
      for (const value of generator) {
        if (stopPile.current) {
          stopPile.current = false;
          break;
        }

        await pause.sleep(50);
        await value();
      }
    },

    async resolveCard({ card, name }) {
      const effect = card.effects[name];
      const chaing = effect.chaing;
      const arrayMethods = chaing.map((chaingPart) => {
        //Register the effect and its params
        activeCardEffect.current.effectNamesAndParams.set(
          chaingPart.name,
          chaingPart.params
        );
        return () => this[chaingPart.name].call(this, chaingPart.params);
      });

      //Register the card that is activating the effect
      activeCardEffect.current.card = card;

      // Effects are resolved by this
      this.iterator(generator(arrayMethods));
    },

    async resolve({ where, name }) {
      const card = activeCard.current[where];
      const effect = card.effects[name];
      const chaing = effect.chaing;
      const arrayMethods = chaing.map((chaingPart) => {
        //Register the effect and its params
        activeCardEffect.current.effectNamesAndParams.set(
          chaingPart.name,
          chaingPart.params
        );
        return () => this[chaingPart.name].call(this, chaingPart.params);
      });

      //Register the card that is activating the effect
      activeCardEffect.current.card = card;

      // Effects are resolved by this
      this.iterator(generator(arrayMethods));
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
      card;
      this.playCardFromHand();
    },

    /******************************************/
    /******** EFFECTS ***********************/
    /****************************************/

    emitBoard() {},

    mergeActiveCard(card, type) {
      if (
        board.lockeds[type] ||
        (game.mode.includes("select") && !card?.toSelect)
      ) {
        return;
      }

      const state = activeCard.current;
      const modesToMergeWithAll = [
        "select:character:to:replace",
        "select:character&&leader",
      ];

      if (game.mode === "select:character&&leader") {
        activeCard.current = state.set({
          [type]: card,
          don: state.don,
        });
      } else if (modesToMergeWithAll.includes(game.mode)) {
        activeCard.current = state.merge({
          [type]: card,
        });
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
            document.body.removeEventListener("click", handlerClick);
            resolve();
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
        params ||
        activeCardEffect.current.effectNamesAndParams.get("addAttack");

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

    playCardFromHand() {
      const card = activeCard.current.hand;

      setBoard((state) =>
        state.merge({
          hand: state.hand.filter((handCard) => handCard.uuid !== card.uuid),
          characters: [...state.characters, card],
        })
      );

      this.cleanAll();
    },

    restMultipleDonsFromActive(params) {
      const { target } = params;
      const card = activeCard.current[target];

      this.restMultipleDons({
        quantity: card.cost,
      });
    },

    restMultipleDons(params) {
      const { quantity } = params;

      setBoard((state) => {
        let iteration = quantity;
        let costs = state.costs.map((cost) => {
          if (iteration > 0 && cost.rested == false) {
            iteration--;
            return { ...cost, rested: true };
          }

          return cost;
        });

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
    },

    registerPlay(params) {
      const { type, effectName } = params;

      setGameState((state) =>
        state.mergePlay({
          effectName,
          type,
          playerId: board.id,
        })
      );
    },

    returnCharacterFromFieldToHand(params) {
      const { character } = activeCard.current;
      const { registerAffectedCard } = params;

      setBoard((state) =>
        state.merge({
          characters: state.characters.filter(
            (currentCharacter) => currentCharacter.uuid !== character.uuid
          ),
          hand: [...state.hand, character],
        })
      );

      if (registerAffectedCard) {
        this.setAffectedCards({ cards: [character] });
      }
    },

    setAffectedCards(params) {
      const { cards } = params;

      cards.forEach((card) => {
        activeCardEffect.current.affectedCards.add(card);
      });
    },

    activateHandSelectorFilteredOr(params) {
      let filteredHand = [];
      const filters = Object.entries(params);

      for (const [functionName, functionParams] of filters) {
        filteredHand = [
          ...filteredHand,
          ...this[functionName]({ arr: board.hand, ...functionParams }),
        ];
      }

      setBoard((state) =>
        state.merge({
          hand: state.hand.map((handCard) => {
            if (filteredHand.find((card) => card.uuid === handCard.uuid)) {
              return { ...handCard, toSelect: true };
            }

            return handCard;
          }),
        })
      );
    },

    activateHandSelectorFilteredAnd(params) {
      let filteredHand = board.hand;
      const filters = Object.entries(params);

      for (const [functionName, functionParams] of filters) {
        filteredHand = this[functionName]({
          arr: filteredHand,
          ...functionParams,
        });
      }

      setBoard((state) =>
        state.merge({
          hand: state.hand.map((handCard) => {
            if (filteredHand.find((card) => card.uuid === handCard.uuid)) {
              return { ...handCard, toSelect: true };
            }

            return handCard;
          }),
        })
      );
    },

    filterByColor(params) {
      const { arr, equal, from } = params;

      let colors = [];

      if (from === "activeCard") {
        colors = [];
      } else if (from === "affectedCards") {
        colors = [...activeCardEffect.current.affectedCards.values()]
          .map((card) => card.colors)
          .flat();
      }

      return arr.filter((card) => {
        let hasColor = false;

        for (let color of colors) {
          hasColor = card.colors.includes(color);
          if (hasColor) break;
        }

        return equal ? hasColor : !hasColor;
      });
    },

    filterByCost(params) {
      const { arr, cost, symbol } = params;

      return arr.filter((card) => eval(`${card.cost} ${symbol} ${cost}`));
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
      const active = ActiveCard.getDefault();
      activeCard.current = active;
      setActiveCard(active);
    },

    cleanGameMode() {
      setGameState((state) =>
        state.merge({
          mode: "",
        })
      );
    },

    cleanHandSelector() {
      return setBoard((state) =>
        state.merge({
          hand: state.hand.map((card) => ({ ...card, toSelect: false })),
        })
      );
    },

    removeClickFromStack() {
      // este proceso es para que el evento click del boton no se quede en el stack
      const elementWithHandler = document.createElement("button");
      elementWithHandler.name = "buttonToWait";
      elementWithHandler.onclick = () => {};
      document.body.appendChild(elementWithHandler);
      elementWithHandler.click();
      document.body.removeChild(elementWithHandler);
    },

    cancel() {
      stopPile.current = true;
      this.removeClickFromStack();
      this.cleanAll();
    },

    cleanAll() {
      this.cleanGameMode();
      this.cleanActiveCards();
      this.cleanCharacterSelectorAll();
      this.cleanLeaderSelector();
      this.unlockAll();
      this.cleanHandSelector();

      activeCardEffect.current = {
        ...defaultActiveEffect,
      };
    },
  };

  const conditions = {
    resolveCard({ card, name }) {
      const currentCard = card;
      const effect = currentCard.effects[name];
      const chaing = effect.conditions;

      return chaing.every((rule) => {
        return (
          effectRules[rule.name]({
            board,
            game,
            activeCards: activeCard.current,
            currentCard,
            effectName: name,
            params: rule.params,
          }) === true
        );
      });
    },

    resolve({ where, name }) {
      const currentCard = activeCard.current[where];
      const effect = currentCard.effects[name];
      const chaing = effect.conditions;

      return chaing.every((rule) => {
        return effectRules[rule.name]({
          board,
          game,
          activeCards: activeCard.current,
          currentCard,
          effectName: name,
          params: rule.params,
        });
      });
    },
    // canAttack() {
    //   const card = activeCard.current.character;
    //   return effectRules.attack({ board, card, game });
    // },
    canAddAtkFromDon() {
      const don = activeCard.current.don;
      return effectRules.canAddAtkFromDon({ game, don });
    },
    canShowConfirmButton() {
      return effectRules.canShowConfirmButton({
        activeCards: activeCard.current,
        game,
        board,
      });
    },
    // canRest() {
    //   const card = activeCard.current.don || activeCard.current.character;
    //   return effectRules.rest({ board, card });
    // },
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
  };

  useEffect(() => {
    deckService.getDecks().then((decks) => {
      states.decks[1](decks);
    });
  }, []);

  /******************************************/
  /******** AUTOMATIC EFFECTS **************/
  /****************************************/
  useEffect(() => {
    if (!board.leader) return;

    Object.entries(board.leader.effects).forEach(
      ([effectName, effectValue]) => {
        const result = conditions.resolveCard({
          card: board.leader,
          name: effectName,
        });

        if (result) {
          if (effectValue.trigger === "auto") {
            actions.resolveCard({ name: effectName, card: board.leader });
          }
        }
      }
    );
  }, [board.leader]);

  return (
    <DuelContext.Provider
      value={{
        states,
        hooks,
        actions,
        conditions,
      }}
    >
      {children}
    </DuelContext.Provider>
  );
}
const duelProvider = { DuelProvider, DuelContext };

export default testMode === "true" ? duelTestProvide : duelProvider;
