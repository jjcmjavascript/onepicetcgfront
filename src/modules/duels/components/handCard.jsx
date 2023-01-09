import React from "react";

import HandCardOptions from "./handCardOptions";

function HandCard({ key, card }) {
  return (
    <>
      <div className="hand--area__card" key={key}>
        <HandCardOptions />

        <img src={card._image.route} className="card--in__hand" />
      </div>
    </>
  );
}

export default HandCard;
