import React from "react";

function BasicCard({
  cardObject,
  onMouseOver,
  onMouseOut,
  id,
  onClick,
  className = "",
}) {
  let alt = "Card";
  let src =
    "https://images.unsplash.com/photo-1625509972901-9c6c8e8d1069?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

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
