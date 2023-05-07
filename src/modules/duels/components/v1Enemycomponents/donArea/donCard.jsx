function DonCard({ card, quantity, onClick }) {
  return (
    <>
      <div className="field--card_full rotated" onClick={onClick}>
        <div className="field--card__image_donQuantity bgBlack60">
          {quantity}
        </div>
        {card && <img src={card._image.route} className="field--card__image" />}
      </div>
    </>
  );
}

export default DonCard;
