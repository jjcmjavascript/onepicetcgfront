import React, { useContext, memo } from "react";
import Store from "../../provider/duelProvider";

function duelMenu() {
  const { states, actions, conditions } = useContext(Store.DuelContext);

  const [boardOne] = states.boardOne;
  const [activeCards] = states.activeCards;
  const isMyTurn = actions.isMyTurn();
  const menuOptionItems = [];

  if (!boardOne.locked && isMyTurn) {
    if (conditions.canAddAtkFromDon()) {
      menuOptionItems.push((key) => (
        <button key={key} onClick={() => actions.resolve("addAttackFromDon")}>
          +1000
        </button>
      ));
    }

    if (conditions.canShowSelectToAddAtkFromDon()) {
      menuOptionItems.push((key) => (
        <button key={key} name="buttonToWait">
          {(activeCards.leader || activeCards.character || {}).name} : +1000
        </button>
      ));
    }

    // if (conditions.canActiveEffect(activeCards)) {
    // }

    if (conditions.canPlayCardCharacter()) {
      menuOptionItems.push((key) => (
        <button key={key} onClick={() => actions.initPlayCard()}>
          Jugar: {activeCards.hand.name}
        </button>
      ));
    }

    if (conditions.canReplaceCharacter()) {
      menuOptionItems.push((key) => (
        <button key={key} onClick={() => actions.initReplaceCharacter()}>
          Jugar: {activeCards.hand.name}
        </button>
      ));
    }

    if (conditions.canReplaceCharacterForPlay()) {
      menuOptionItems.push((key) => (
        <button
          key={key}
          onClick={() => actions.replaceCharacter()}
          name="buttonToWait"
        >
          Reemplazar
        </button>
      ));
    }

    menuOptionItems.push((key) => (
      <button key={key} onClick={() => actions.finishTurn()}>
        Terminar Turno
      </button>
    ));
  }

  menuOptionItems.push((key) => (
    <button key={key} onClick={() => actions.cancel()}>
      Cancelar
    </button>
  ));

  // menuOptionItems.push((key) => (
  //   <button key={key} onClick={() => actions.resolve("addAttackFromLeader")}>
  //     Test Ataque pa todos
  //   </button>
  // ));

  return (
    <>
      <div className="previewAndPhaseZone">
        <div className="previewAndPhaseZone--preview"></div>

        <div className="previewAndPhaseZone--phases">
          {menuOptionItems.map((menuItem, key) => menuItem(key))}
        </div>
      </div>
    </>
  );
}

export default memo(duelMenu);
