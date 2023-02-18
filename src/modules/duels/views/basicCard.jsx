import React from "react";

function BasicCard({
  cardObject,
  onMouseOver,
  onMouseOut,
  id,
  onClick,
  className = "",
}) {
  let alt = "Some Card";
  let src = "https://i.ibb.co/5FN0k67/pic1737624.webp";

  if (cardObject) {
    alt = cardObject.name;
    src = cardObject._image.route;
  }

  return (
    <div
      id={id}
      className={"carta " + className}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <img alt={alt} src={src} />
    </div>
  );
}

export default BasicCard;
