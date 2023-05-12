function DonCardHalf({ card, onClick, id }) {
  return (
    <>
      <div className="field--card_half rotated" onClick={onClick} id={id}>
        <img src={card._image.route} className="field--card__image" />
      </div>
    </>
  );
}

export default DonCardHalf;
