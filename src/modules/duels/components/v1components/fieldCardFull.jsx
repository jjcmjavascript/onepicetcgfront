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
  const newClassName = className
    ? `field--card_full ${className}`
    : defaultClassName;

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
