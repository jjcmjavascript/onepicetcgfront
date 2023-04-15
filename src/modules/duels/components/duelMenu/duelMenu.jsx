import React, { useRef, useContext, memo } from "react";
import Store from "../../provider/duelProvider";

function duelMenu() {
  const { states, actions, conditions } = useContext(Store.DuelContext);

  const [activeCards] = states.activeCards;

  const menuOptionItems = [
    (key) => (
      <button key={key} onClick={actions.finishTurn}>
        Terminar Turno
      </button>
    ),
  ];

  if (conditions.canAddAtkFromDon(activeCards.don)) {
    menuOptionItems.push((key) => (
      <button
        key={key}
        onClick={() => actions.initSumAttackFromDonEvent(activeCards.don)}
      >
        +1000
      </button>
    ));
  }

  if (conditions.canShowSelectToAddAtkFromDon(activeCards)) {
    menuOptionItems.push((key) => (
      <button key={key} onClick={() => actions.plusAttakFromDon(activeCards)}>
        {(activeCards.leader || activeCards.character || {}).name} : +1000
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
