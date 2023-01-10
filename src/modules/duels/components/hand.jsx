import React from "react";

import HandCard from "./handCard";

import "./css/characterArea.css";

function Hand({ hand }) {
  const syle = {
    width: "100px",
  };
  return (
    <>
      <div className="hand--area">
        {hand.map((card, index) => (
          <HandCard key={card.code + card.id * index} card={card} index={index}/>
        ))}
      </div>
    </>
  );
}

export default Hand;
