function DonCardHalf({ card, onClick, id }) {
  const rested = card.rested ? "card--rested" : "";

  return (
    <>
      <div className={`field--card_half ${rested}`} onClick={onClick} id={id}>
        <img src={card._image.route} className="field--card__image" />
      </div>
    </>
  );
}

export default DonCardHalf;
