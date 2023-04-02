import React from "react";
import BasicCard from "./basicCard";

function DuelCard({
  cardObject,
  onMouseOver,
  onMouseOut,
  id,
  onClick,
  className = "",
}) {
  return (
    <BasicCard
      cardObject={cardObject}
      id={id}
      className={className}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    />
  );
}

export default DuelCard;
