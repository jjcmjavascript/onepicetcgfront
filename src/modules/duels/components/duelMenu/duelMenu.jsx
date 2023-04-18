import React, { useRef, useContext, memo } from "react";
import Store from "../../provider/duelProvider";

function duelMenu() {
  const { states, actions, conditions } = useContext(Store.DuelContext);

  const [activeCards] = states.activeCards;

  const menuOptionItems = [];

  if (actions.isMyTurn()) {
    menuOptionItems.push((key) => (
      <button key={key} onClick={() => actions.finishTurn()}>
        Terminar Turno
      </button>
    ));
  }

  if (conditions.canAddAtkFromDon()) {
    menuOptionItems.push((key) => (
      <button key={key} onClick={() => actions.initSumAttackFromDonEvent()}>
        +1000
      </button>
    ));
  }

  if (conditions.canShowSelectToAddAtkFromDon()) {
    menuOptionItems.push((key) => (
      <button key={key} onClick={() => actions.plusAttakFromDon()}>
        {(activeCards.leader || activeCards.character || {}).name} : +1000
      </button>
    ));
  }

  if (conditions.canActiveEffect(activeCards)) {
  }

  if (conditions.canPlayCard()) {
    menuOptionItems.push((key) => (
      <button key={key} onClick={() => actions.initPlayCard()}>
        Jugar
      </button>
    ));
  }

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
