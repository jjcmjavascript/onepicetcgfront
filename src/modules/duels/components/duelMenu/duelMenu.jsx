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
        <button
          key={key}
          onClick={() =>
            actions.resolve({ where: "don", name: "addAttackFromDon" })
          }
        >
          +1000
        </button>
      ));
    }

    if (conditions.canShowConfirmButton()) {
      menuOptionItems.push((key) => (
        <button key={key} name="buttonToWait">
          Confirmar:
          {
            Object.values(activeCards).find(
              (active) => active != null && active.type != "Don"
            ).name
          }
        </button>
      ));
    }

    if (activeCards?.leader) {
      Object.entries(activeCards.leader.effects).forEach(
        ([effectName, effectValue]) => {
          if (conditions.resolve({ where: "leader", name: effectName })) {
            if (effectValue.trigger !== "auto") {
              menuOptionItems.push((key) => (
                <button
                  key={key}
                  onClick={() =>
                    actions.resolve({ name: effectName, where: "leader" })
                  }
                >
                  Activar: {effectValue.label}
                </button>
              ));
            }
          }
        }
      );
    }

    if (activeCards?.hand) {
      Object.entries(activeCards.hand.effects).forEach(
        ([effectName, effectValue]) => {
          if (conditions.resolve({ where: "hand", name: effectName })) {
            if (effectValue.trigger !== "auto") {
              menuOptionItems.push((key) => (
                <button
                  key={key}
                  onClick={() =>
                    actions.resolve({ name: effectName, where: "hand" })
                  }
                >
                  Activar: {effectValue.label}
                </button>
              ));
            }
          }
        }
      );
    }

    menuOptionItems.push((key) => (
      <button key={key} onClick={() => actions.finishTurn()}>
        Terminar Turno
      </button>
    ));
  }

  // if (currentEffectPile.current) {
  menuOptionItems.push((key) => (
    <button
      className={"active--phase"}
      key={key}
      onClick={() => actions.cancel()}
    >
      Cancelar
    </button>
  ));
  // }

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
