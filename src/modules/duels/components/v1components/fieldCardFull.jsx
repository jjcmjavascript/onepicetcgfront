import React, { memo, forwardRef } from "react";
import FieldCardEffectList from "../FieldCardEffectList";

function FieldCardFull(
  { card, onMouseOver, onMouseOut, id, onClick, className = "" },
  ref
) {
  const defaultClassName = `field--card_full`;
  let newClassName = className
    ? `field--card_full ${className}`
    : defaultClassName;

  if (card && card.toSelect) {
    newClassName = `${newClassName} card_to_select`;
  }

  if (card && card.selected) {
    newClassName = `${newClassName} card_to_select__selected`;
  }

  return (
    <>
      <div
        ref={ref}
        id={id}
        className={newClassName}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {card && <FieldCardEffectList card={card} />}

        {card && <img src={card._image.route} className="field--card__image" />}
      </div>
    </>
  );
}

export default memo(forwardRef(FieldCardFull));
