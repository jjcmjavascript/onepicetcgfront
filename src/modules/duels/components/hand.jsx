import React from "react";

import HandCardOptions from "./handCardOptions";

import HandCard from "./handCard";

import "./css/characterArea.css";

function Hand({ hand }) {
  const syle = {
    width: "100px",
  };
  return (
    <>
      <div className="hand--area">
        {/* {cardBasicEffects.isShowingOptions(id) && <HandCardOptions card={card} />} */}

        {hand.map((card, index) => (
          <HandCard key={card.code + card.id * index} card={card} index={index}/>
        ))}
      </div>
    </>
  );
}

export default Hand;
