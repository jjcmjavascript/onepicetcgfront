import React from "react";

function FieldCardFull({
  card,
  onMouseOver,
  onMouseOut,
  id,
  onClick,
  className = "",
}) {
  const defaultClassName = `field--card_full`;
  let newClassName = className
    ? `field--card_full ${className}`
    : defaultClassName;

  if (card && card.toSelect) {
    console.log("card.toSelect", card.toSelect);
    newClassName = `${newClassName} card_to_select`;
  }

  if (card && card.selected) {
    newClassName = `${newClassName} card_to_select__selected`;
  }

  return (
    <>
      <div
        id={id}
        className={newClassName}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {card && <img src={card._image.route} className="field--card__image" />}
      </div>
    </>
  );
}

export default FieldCardFull;
