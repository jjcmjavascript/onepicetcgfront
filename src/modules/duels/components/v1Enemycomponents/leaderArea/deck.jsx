import { forwardRef } from "react";

function Deck({ children, count = 0, id, onClick }, ref) {
  const tempImg =
    "https://cf.geekdo-images.com/lBPmfYGjJ-UQ5DZ_wKuBGA__imagepage/img/GNe5INGZDgiakJibSM0zNWLMxSQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1737624.jpg";
  return (
    <>
      <div
        id={id}
        className="field--card_full rotated"
        onClick={onClick}
        ref={ref}
      >
        <div className="field--card__image_deckQuantity bgBlack60">{count}</div>
        <img src={tempImg} className="field--card__image" />
      </div>
    </>
  );
}

export default forwardRef(Deck);
