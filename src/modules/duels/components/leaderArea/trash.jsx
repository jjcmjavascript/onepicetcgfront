import React from "react";

function Deck({ children, count = 0, id, onClick }) {
  const tempImg =
    "https://pbs.twimg.com/tweet_video_thumb/Dq3QwNuXgAMfVN-.jpg";
  return (
    <>
      <div id={id} className="field--card_full" onClick={onClick}>
        <div className="field--card__image_deckQuantity bgBlack60">{count}</div>
        <img src={tempImg} className="field--card__image" />
      </div>
    </>
  );
}

export default Deck;
